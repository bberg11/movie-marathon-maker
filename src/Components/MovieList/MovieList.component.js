import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import { getResults as getResultsAction } from 'Redux/search/search.actions';
import MovieListItem from 'Components/MovieListItem/MovieListItem.component';

import './MovieList.styles.scss';

const MovieList = ({ condensed, results, getResults }) => {
  const { query } = useParams();

  useEffect(() => {
    if (Object.keys(results).length > 0 || !query) {
      return;
    }

    getResults(query);
  }, [query, results, getResults]);

  return (
    <ul className="movie-list">
      {Object.values(results).map((movie) => (
        <MovieListItem movie={movie} key={movie.id} condensed={condensed} />
      ))}
    </ul>
  );
};

MovieList.defaultProps = {
  condensed: false,
};

MovieList.propTypes = {
  condensed: PropTypes.bool,
  getResults: PropTypes.func.isRequired,
  results: PropTypes.shape(propShapes.movies).isRequired,
};

function mapStateToProps(state) {
  return { results: state.search.results };
}

const mapDispatchToProps = (dispatch) => ({
  getResults: (query) => dispatch(getResultsAction(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
