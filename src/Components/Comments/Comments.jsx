import { useEffect, useState } from 'react';

import { getKids } from '../../Api/ApiFetch';
import { Comment, Loader } from '../../Components/index';

import './Comments.scss';

export const Comments = ({data}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  
  const kids = data.kids;
  
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
  
  const toggleVisible = () => setVisible(!visible);
  
  return (
    <>
      <Comment data={data}/>
      {kids && <div onClick={toggleVisible} className="comment__more">See all answers</div>}
      {loading && kids
        ? <Loader/>
        : comments && !loading && visible && comments.map(item => (
        <Comment data={item} child={true} />
      ))
      }
    </>
  );
};