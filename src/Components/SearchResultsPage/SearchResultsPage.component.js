import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import { getResults as getResultsAction } from 'Redux/search/search.actions';
import MovieList from 'Components/MovieList/MovieList.component';

import './SearchResultsPage.styles.scss';

const SearchResultsPage = ({ getResults, results }) => {
  const { query } = useParams();

  useEffect(() => {
    if (Object.keys(results).length > 0 || !query) {
      return;
    }

    getResults(query);
  }, [query, results, getResults]);

  return (
    <section className="search-results-page">
      <h1>
        Search Results For: <em>&quot;{query}&quot;</em>
      </h1>
      <MovieList results={results} />
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
  getResults: (query) => dispatch(getResultsAction(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);
