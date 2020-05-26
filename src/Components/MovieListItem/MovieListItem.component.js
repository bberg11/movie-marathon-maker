import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { movie as moviePropType } from 'propTypes';

import { addMovie } from 'Redux/timeline/timeline.actions';

import 'Components/MovieListItem/MovieListItem.styles.css';

const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';

const MovieListItem = ({ movie, addMovie }) => {
  return (
    <li className="movie-list-item">
      {movie.poster_path ? (
        <img
          src={`${TMDB_BASE_IMAGE_URL}/w185${movie.poster_path}`}
          alt={`${movie.title} Movie Poster`}
        />
      ) : (
        ''
      )}
      <p>{movie.title}</p>
      <p>{movie.overview}</p>
      <p>{movie.runtime}</p>
      <p>
        <button className="btn" type="button" onClick={() => addMovie(movie)}>
          Add to timeline
        </button>
      </p>
    </li>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.shape(moviePropType).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addMovie: (movie, start) => dispatch(addMovie(movie, start)),
});

export default connect(null, mapDispatchToProps)(MovieListItem);
