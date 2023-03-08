import './Pagination.scss';

export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => {
          if (currentPage === number) {
            return (
              <li key={number} className="pagination__item">
                <button
                  onClick={() => paginate(number)}
                  className="pagination__item__link  pagination__item__link--active btn"
                >
                  {number}
                </button>
              </li>
            );
          }
          
          return (
            <li key={number} className="pagination__item">
              <button onClick={() => paginate(number)} className="pagination__item__link btn">
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};