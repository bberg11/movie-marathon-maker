import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';

import './MovieListItem.styles.scss';

const MovieListItem = ({
  buttonClassName,
  handleAddToTimeline,
  movie,
  movieAlreadyExists,
  posterSrc,
  releaseYear,
  runtimeExceedsLength,
}) => {
  return (
    <li className="movie-list-item">
      <Link
        to={{
          pathname: `/movie/${movie.id}`,
          state: {
            movie,
          },
        }}
        className="movie-list-item__link"
      >
        <div className="movie-list-item__image-wrap">
          <img
            src={posterSrc}
            alt={`${movie.title} Movie Poster`}
            className="movie-list-item__image"
          />
        </div>
        <div className="movie-list-item__content">
          <p className="movie-list-item__title">{movie.title}</p>
          <p>{releaseYear}</p>
          <p>{movie.runtime} minutes</p>

          {runtimeExceedsLength && !movieAlreadyExists ? (
            <em>
              Adding this movie will extend your marathon beyond its length
            </em>
          ) : (
            ''
          )}
        </div>

        <button
          className={`movie-list-item__add ${buttonClassName}`}
          type="button"
          onClick={handleAddToTimeline.bind(this, movie)}
          disabled={movieAlreadyExists}
        >
          {movieAlreadyExists ? (
            <em>Already in your marathon</em>
          ) : (
            'Add to marathon'
          )}
        </button>
      </Link>
    </li>
  );
};

MovieListItem.propTypes = {
  buttonClassName: PropTypes.string.isRequired,
  handleAddToTimeline: PropTypes.func.isRequired,
  movie: PropTypes.shape(propShapes.movie).isRequired,
  movieAlreadyExists: PropTypes.bool.isRequired,
  posterSrc: PropTypes.string.isRequired,
  releaseYear: PropTypes.string.isRequired,
  runtimeExceedsLength: PropTypes.bool.isRequired,
};

export default MovieListItem;
