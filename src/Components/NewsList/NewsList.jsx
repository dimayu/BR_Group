import { useEffect, useState } from 'react';
import { NewsListItem, Loader, Pagination } from '../index';

import './NewsList.scss';

export const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const baseUrl = "https://hacker-news.firebaseio.com/v0/newstories.json";
  const newsItemUrl = "https://hacker-news.firebaseio.com/v0/item/";
  
  useEffect(() => {
    const fetchData = (url) => {
      return new Promise((resolve, reject) => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
      });
    };
    const newsList = [];
    const getData = async () => {
      setLoading(true);
      const data = await fetchData(baseUrl);
      await data.map(async (id) => {
        const newsData = await fetchData(`${newsItemUrl}${id}.json`);
        newsList.push(newsData);
        if (newsList.length > 99) {
          setNews(newsList.slice(0, 99).sort((a, b) => a.time > b.time ? -1 : 1));
          setLoading(false);
        }
      });
    };
    getData();
    // setInterval(() => {
    //   getData()
    // }, 60000);
  }, []);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNews = news.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  console.log(currentNews);
  
  return (
    <div className="news">
      <div className="wrapper">
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
  );
}