import { formatDate } from '../../Helpers/FormatDate';

import './Comment.scss';

export const Comment = ({ data, child }) => {
  
  return (
    <div className={`${child ? "comment comment-child" : "comment"}`}>
      <div className="comment__item">
        <span className="comment__item__title">Nickname:</span>
        <span className="comment__item__value">{data.by}</span>
      </div>
      <div className="comment__item comment__item__content">
        {data.text}
      </div>
      <div className="comment__item">
        <span className="comment__item__title">Date:</span>
        <span className="comment__item__value">{formatDate(data.time)}</span>
      </div>
    </div>
  );
}