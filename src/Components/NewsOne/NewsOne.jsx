import { useEffect, useState } from 'react';
import { useParams } from "react-router";

import { fetchPost } from '../../Api/ApiFetch';
import { Loader, NewsOneContent } from '../index';

import './NewsOne.scss';

export const NewsOne = () => {
  const [newsOne, setNewsOne] = useState({});
  const [loading, setLoading] = useState(true);
  const param = useParams();
  const id = param.id;
  
  useEffect(() => {
    fetchPost(id)
    .then(data => {
      if (data) {
        setNewsOne(data);
        setLoading(false);
      }
    })
    .catch((err) => console.log(err));
  }, [id]);
  
  return (
    <main>
      <div className="wrapper">
        <div className="news-one">
          {loading
            ? <Loader/>
            : newsOne.id ? <NewsOneContent data={newsOne}/> : <h4 className="not-found">Nothing found</h4>
          }
        </div>
      </div>
    </main>
  );
}