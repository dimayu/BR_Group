import { useEffect, useState } from 'react';
import { fetchTopPosts } from '../../Api/ApiFetch'
import { NewsListItem, Loader, Pagination } from '../index';

import './NewsList.scss';

export const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);
  
  useEffect(() => {
    const newsArr = () => {
      fetchTopPosts()
      .then(data => {
        if (data) {
          setNews(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    };
    newsArr();
    
    setInterval(() => {
      newsArr();
    }, 30000);
  }, [reload]);
  
  const onReload = () => setReload(!reload);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNews = news.sort((a, b) => a.time > b.time ? -1 : 1).slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <main>
      <div className="news">
        <div className="wrapper">
          <button  className="btn" onClick={onReload}>
            Reload
          </button>
          {loading
            ? <Loader/>
            : currentNews.map ? currentNews.map(item => (
              <NewsListItem key={item.id} {...item}/>
            )) : <h4 className="not-found">Nothing found</h4>
          }
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={news.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </main>
  );
}