import { Link } from 'react-router-dom';

import './NewsListItem.scss';

export const NewsListItem = ({
  id,
  title,
  score,
  by,
  time
}) => {
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
  const dateTime = `${hours}h ${minutes} : ${seconds}`;
  
  return (
    <Link className="news__item">
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
        <span> </span>
        <span className="news__item__sub--title">Time:</span>
        <span className="news__item__sub--value">{dateTime}</span>
      </div>
    </Link>
  );
}