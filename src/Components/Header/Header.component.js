import React from 'react';
import { Link } from 'react-router-dom';

import SearchForm from 'Components/SearchForm/SearchForm.component';

import './Header.styles.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Movie Marathon Maker
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/timeline" className="header__nav-link">
                Timeline
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/account" className="header__nav-link">
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <section className="header__search">
        <SearchForm />
      </section>
    </header>
  );
};

export default Header;
