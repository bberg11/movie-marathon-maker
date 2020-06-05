import React from 'react';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import MovieListItem from 'Components/MovieListItem/MovieListItem.component';

import './MovieList.styles.scss';

const MovieList = ({ condensed, results }) => {
  if (!results) {
    return <h2>No Results</h2>;
  }

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
  results: PropTypes.shape(propShapes.movies).isRequired,
};
export default MovieList;
