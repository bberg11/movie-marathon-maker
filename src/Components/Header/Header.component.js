import React from 'react';
import { Link } from 'react-router-dom';

import SearchForm from 'Components/SearchForm/SearchForm.component';

const Header = () => {
  return (
    <nav className="nav-extended">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Logo
        </Link>
        <ul className="right">
          <li>
            <Link to="/timeline">Timeline</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
        </ul>
      </div>
      <div className="nav-content center">
        <SearchForm />
      </div>
    </nav>
  );
};

export default Header;
