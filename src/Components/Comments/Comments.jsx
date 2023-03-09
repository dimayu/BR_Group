import { useEffect, useState } from 'react';
import { formatDate } from '../../Helpers/FormatDate';
import { getKids } from '../../Api/ApiFetch';

import './Comments.scss';
import { Loader } from '../Loader';

export const Comments = ({by, time, text, kids}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  
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
  }, [kids]);
  
  const date = formatDate(time);
  
  const toggleVisible = () => setVisible(!visible);
  
  return (
    <div className="comment" onClick={toggleVisible}>
      <div className="comment__item">
        <span className="comment__item__title">Nickname:</span>
        <span className="comment__item__value">{by}</span>
      </div>
      <div className="comment__item comment__item__content">
        {text}
      </div>
      <div className="comment__item">
        <span className="comment__item__title">Date:</span>
        <span className="comment__item__value">{date}</span>
      </div>
      {loading && kids
        ? <Loader/>
        :comments && !loading && visible && comments.map(item => (
            <div className="comment-child" key={item.id}>
              <div className="comment__item">
                <span className="comment__item__title">Nickname:</span>
                <span className="comment__item__value">{item.by}</span>
              </div>
              <div className="comment__item comment__item__content">
                {item.text}
              </div>
              <div className="comment__item">
                <span className="comment__item__title">Date:</span>
                <span className="comment__item__value">{formatDate(item.time)}</span>
              </div>
            </div>
          ))
      }
    </div>
  );
}