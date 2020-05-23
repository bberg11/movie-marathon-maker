import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { movies } from 'propTypes';
import 'Components/MovieList/MovieList.styles.css';
import MovieListItem from 'Components/MovieListItem/MovieListItem.component';

const MovieList = ({ results }) => {
  return (
    <ul className="movie-list">
      {Object.values(results).map((movie) => (
        <MovieListItem movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  results: PropTypes.shape(movies).isRequired,
};

function mapStateToProps(state) {
  return { results: state.search.results };
}

export default connect(mapStateToProps)(MovieList);
