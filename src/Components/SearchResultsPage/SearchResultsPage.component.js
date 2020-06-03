import React from 'react';
import PropTypes from 'prop-types';

import MovieList from 'Components/MovieList/MovieList.component';

import './SearchResultsPage.styles.scss';

const SearchResultsPage = ({ match: { params } }) => {
  return (
    <section className="search-results-page">
      <h1>
        Search Results For: <em>&quot;{params.query}&quot;</em>
      </h1>
      <MovieList />
    </section>
  );
};

SearchResultsPage.defaultProps = {
  match: {
    params: {},
  },
};

SearchResultsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string,
    }),
  }),
};

export default SearchResultsPage;
