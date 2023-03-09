import { Link } from 'react-router-dom';

import { formatDate } from '../../Helpers/FormatDate';

import './NewsListItem.scss';

export const NewsListItem = ({
  id,
  title,
  score,
  by,
  time
}) => {
  
  const date = formatDate(time);
  
  return (
    <Link to={`/news-one/${id}`} className="news__item">
      <div className="news__item__title">{title}</div>
      <div className="news__item__score news__item__sub">
        <span className="news__item__sub--title">Rating:</span>
        <span className="news__item__sub--value">{score}</span>
      </div>
      <div className="news__item__name news__item__sub">
        <span className="news__item__sub--title">Nickname:</span>
        <span className="news__item__sub--value">{by}</span>
      </div>
      <div className="news__item__time news__item__sub">
        <span className="news__item__sub--title">Date:</span>
        <span className="news__item__sub--value">{date}</span>
      </div>
    </Link>
  );
}