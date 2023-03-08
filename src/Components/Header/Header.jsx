import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <Link to="/" className="header__logo">
          BG Group
        </Link>
      </div>
    </header>
  );
}