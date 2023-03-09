import { useEffect, useState } from 'react';

import './NewsOneContent.scss';

export const NewsOneContent = ({data}) => {
  const {title, by, url, time, kids} = data;
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  
  const newsItemUrl = "https://hacker-news.firebaseio.com/v0/item/";
  
  function addZero(num) {
    if (num < 10) {
      return ('0' + num).slice(-2);
    } else {
      return num
    }
  }
  
  const year = new Date(time).getFullYear();
  const month = new Date(time).getMonth();
  const day = addZero(new Date(time).getDate());
  const minutes = addZero(new Date(time).getMinutes());
  const seconds = addZero(new Date(time).getSeconds());
  const hours = addZero(new Date(time).getHours());
  const date = `${day} / ${month + 1} / ${year}`;
  const dateTime = `${hours}: ${minutes} : ${seconds}`;
  
  useEffect(() => {
    const fetchData = (url) => {
      return new Promise((resolve, reject) => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
      });
    };
    
    if (kids) {
      const getData = async () => {
        const commentsArr = [];
        setLoading(true);
        await kids.map(async (id) => {
          const newsData = await fetchData(`${newsItemUrl}${id}.json?print=pretty`);
          commentsArr.push(newsData);
          if (commentsArr) {
            setComments(commentsArr);
            setLoading(false);
          }
        });
      };
      getData();
    }
  }, [kids]);
  
  return (
    <div className="news-one__content">
      <div className="news__item__title">{title}</div>
      <div className="news__item__score news__item__sub">
        <span className="news__item__sub--title">Link:</span>
        <a href={url} className="news__item__sub--value">{url}</a>
      </div>
      <div className="news__item__name news__item__sub">
        <span className="news__item__sub--title">Nickname:</span>
        <span className="news__item__sub--value">{by}</span>
      </div>
      <div className="news__item__time news__item__sub">
        <span className="news__item__sub--title">Date:</span>
        <span className="news__item__sub--value">{date}</span>
        <span> </span>
        <span className="news__item__sub--title">Time:</span>
        <span className="news__item__sub--value">{dateTime}</span>
      </div>
    </div>
  );
};