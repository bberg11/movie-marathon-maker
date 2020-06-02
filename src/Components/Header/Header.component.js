import React from 'react';
import { Link } from 'react-router-dom';

import SearchForm from 'Components/SearchForm/SearchForm.component';

import './Header.styles.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo heading heading--1">
          The Movie Marathon Maker
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/timeline" className="header__nav-link">
                My Current Marathon
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/account" className="header__nav-link">
                My Account
              </Link>
            </li>
          </ul>
        </nav>
        <section className="header__search">
          <SearchForm />
        </section>
      </div>
    </header>
  );
};

export default Header;
