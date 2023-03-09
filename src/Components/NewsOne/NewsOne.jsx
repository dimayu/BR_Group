import { useEffect, useState } from 'react';
import { useParams } from "react-router";

import { Loader, NewsOneContent } from '../index';

import './NewsOne.scss';

export const NewsOne = () => {
  const [newsOne, setNewsOne] = useState({});
  const [loading, setLoading] = useState(true);
  const newsItemUrl = "https://hacker-news.firebaseio.com/v0/item/";
  const param = useParams();
  const id = param.id;
  
  useEffect(() => {
    fetch(`${newsItemUrl}${id}.json`)
    .then(response => {
      if (response?.ok) {
        return response.json();
      }
    })
    .then(data => {
      if (data) {
        setNewsOne(data);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
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