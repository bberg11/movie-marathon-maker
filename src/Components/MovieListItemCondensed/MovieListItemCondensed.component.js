import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';

import './MovieListItemCondensed.styles.scss';

const MovieListItemCondensed = ({
  buttonClassName,
  handleAddToTimeline,
  handleLinkClick,
  movie,
  movieAlreadyExists,
  posterSrc,
  releaseYear,
  runtimeExceedsLength,
}) => {
  return (
    <li className="movie-list-item movie-list-item--condensed">
      <Link
        to={{
          pathname: `/movie/${movie.id}`,
          state: {
            movie,
          },
        }}
        className="movie-list-item__link"
        onClick={handleLinkClick}
      >
        <div className="movie-list-item__image-wrap">
          <img
            src={posterSrc}
            alt={`${movie.title} Movie Poster`}
            className="movie-list-item__image"
          />
        </div>
        <div className="movie-list-item__content">
          <p className="movie-list-item__title">
            {movie.title} ({releaseYear}) | {movie.runtime} minutes
          </p>

          <button
            className={`btn ${buttonClassName}`}
            type="button"
            onClick={handleAddToTimeline.bind(this, movie)}
            disabled={movieAlreadyExists}
          >
            Add to marathon
          </button>

          {runtimeExceedsLength && !movieAlreadyExists ? (
            <em>
              Adding this movie will extend your marathon beyond its length
            </em>
          ) : (
            ''
          )}

          {movieAlreadyExists ? <em>Already in your marathon</em> : ''}
        </div>
      </Link>
    </li>
  );
};

MovieListItemCondensed.propTypes = {
  buttonClassName: PropTypes.string.isRequired,
  handleAddToTimeline: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  movie: PropTypes.shape(propShapes.movie).isRequired,
  movieAlreadyExists: PropTypes.bool.isRequired,
  posterSrc: PropTypes.string.isRequired,
  releaseYear: PropTypes.string.isRequired,
  runtimeExceedsLength: PropTypes.bool.isRequired,
};

export default MovieListItemCondensed;
