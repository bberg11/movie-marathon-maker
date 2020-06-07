import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import './Pagination.styles.scss';

const Gap = () => (
  <li className="pagination__item">
    <span className="pagination__node pagination__node--gap">...</span>
  </li>
);

const Pagination = ({ currentPage, totalPages }) => {
  const location = useLocation();
  const [nextPages, setNextPages] = useState([]);

  useEffect(() => {
    if (currentPage < 1) {
      return;
    }

    const pages = [];

    for (let i = currentPage - 2; i < currentPage + 5; i += 1) {
      pages.push(i);
    }

    setNextPages(pages);
  }, [currentPage]);

  const renderPages = (page) => {
    if (page < 1 || page > totalPages) {
      return '';
    }

    if (page === currentPage) {
      return (
        <li key={page} className="pagination__item">
          <span className="pagination__node">{page}</span>
        </li>
      );
    }

    return (
      <li key={page} className="pagination__item">
        <Link
          to={{
            pathname: location.pathname,
            search: `?page=${page}`,
          }}
          className="pagination__node"
        >
          {page}
        </Link>
      </li>
    );
  };

  const renderJumpTo = (page) => {
    return (
      <>
        {page === 1 ? '' : <Gap />}
        <li className="pagination__item">
          <Link
            to={{
              pathname: location.pathname,
              search: `?page=${page}`,
            }}
            className="pagination__node"
          >
            {page}
          </Link>
        </li>
        {page === totalPages ? '' : <Gap />}
      </>
    );
  };

  return (
    <ul className="pagination">
      {currentPage === 1 ? (
        ''
      ) : (
        <li className="pagination__item">
          <Link
            to={{
              pathname: location.pathname,
              search: `?page=${currentPage - 1}`,
            }}
            className="pagination__node pagination__node--previous"
          >
            <MdNavigateBefore title="Previous" className="pagination__icon" />
          </Link>
        </li>
      )}

      {nextPages.includes(1) || nextPages.includes(2) ? '' : renderJumpTo(1)}

      {nextPages.map((page) => renderPages(page))}

      {nextPages.includes(totalPages) ? '' : renderJumpTo(totalPages)}

      {currentPage === totalPages.length ? (
        ''
      ) : (
        <li className="pagination__item">
          <Link
            to={{
              pathname: location.pathname,
              search: `?page=${currentPage + 1}`,
            }}
            className="pagination__node pagination__node--next"
          >
            <MdNavigateNext title="Next" className="pagination__icon" />
          </Link>
        </li>
      )}
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.search.pagination.currentPage,
    totalPages: state.search.pagination.totalPages,
    totalResults: state.search.pagination.totalResults,
  };
};

export default connect(mapStateToProps)(Pagination);
