import React from 'react';
import PropTypes from 'prop-types';

import { movie as moviePropType } from 'propTypes';
import 'Components/MovieListItem/MovieListItem.styles.css';

const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';

const MovieListItem = ({ movie }) => {
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
    </li>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.shape(moviePropType).isRequired,
};

export default MovieListItem;
