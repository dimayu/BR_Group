import { useEffect, useState } from 'react';

import { getKids } from '../../Api/ApiFetch';
import { formatDate } from '../../Helpers/FormatDate'

import './NewsOneContent.scss';

export const NewsOneContent = ({data}) => {
  const {title, by, url, time, kids} = data;
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  
  const date = formatDate(time);
  
  useEffect(() => {
    if (kids) {
      getKids(kids)
      .then(data => {
        if (data) {
          setComments(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
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
      </div>
    </div>
  );
};