import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getKids } from '../../Api/ApiFetch';
import { formatDate } from '../../Helpers/FormatDate'
import { Comments, Loader } from '../../Components/index';

import './NewsOneContent.scss';

export const NewsOneContent = ({data}) => {
  const {title, by, url, time, kids} = data;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  
  const navigate = useNavigate();
  
  const date = formatDate(time);
  
  const commentsLength = useMemo(() => {
    return comments
      ? comments.reduce((acc, el) => {
        return (acc + 1 + (el?.kids?.length || 0))
      }, 0)
      : 0;
  }, [comments]);
  
  const onReload = () => setReload(!reload);
  
  useEffect(() => {
    if (kids) {
      getKids(kids)
      .then(data => {
        if (data) {
          setComments(data.filter((e) => e.text !== '[dead]'));
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    }
  }, [kids, reload]);
  
  return (
    <div className="news-one__content">
      <div className="btns">
        <button className="btn" onClick={() => navigate(-1)}>Back</button>
        <button className="btn" onClick={onReload}>Reload comments</button>
      </div>
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
      <div className="news__item__time news__item__sub">
        <span className="news__item__sub--title">Comments:</span>
        <span className="news__item__sub--value">{commentsLength}</span>
      </div>
      {loading && kids
        ? <Loader/>
        :comments && !loading ? comments.map(item => (
                    <Comments data={item} key={item.id}/>
                  ))
                : <p>No comments</p>
      }
    </div>
  );
};