import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import propShapes from 'Constants/propShapes';
import { getResults as getResultsAction } from 'Redux/search/search.actions';
import MovieList from 'Components/MovieList/MovieList.component';
import Pagination from 'Components/Pagination/Pagination.component';

import './SearchResultsPage.styles.scss';

const SearchResultsPage = ({ getResults, results }) => {
  const { query } = useParams();
  const location = useLocation();
  const { page } = queryString.parse(location.search);

  useEffect(() => {
    getResults(query, page);
  }, [getResults, page, query]);

  useEffect(() => {
    if (Object.keys(results).length > 0 || !query) {
      return;
    }

    getResults(query, page);
  }, [query, results, getResults, page]);

  return (
    <section className="search-results-page">
      <h1>
        Search Results For: <em>&quot;{query}&quot;</em>
      </h1>
      <div className="search-results-page__pagination search-results-page__pagination--top">
        <Pagination currentResultsCount={Object.keys(results).length} />
      </div>
      <MovieList results={results} />
      <div className="search-results-page__pagination search-results-page__pagination--bottom">
        <Pagination currentResultsCount={Object.keys(results).length} />
      </div>
    </section>
  );
};

SearchResultsPage.defaultProps = {
  results: {},
};

SearchResultsPage.propTypes = {
  getResults: PropTypes.func.isRequired,
  results: PropTypes.shape(propShapes.movies),
};

const mapStateToProps = (state) => {
  return { results: state.search.results };
};

const mapDispatchToProps = (dispatch) => ({
  getResults: (query, page) => dispatch(getResultsAction(query, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);
