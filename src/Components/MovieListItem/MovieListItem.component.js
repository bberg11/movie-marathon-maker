import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { movie as moviePropType } from 'propTypes';

import { addMovie } from 'Redux/timeline/timeline.actions';
import { toggleAutocomplete } from 'Redux/search/search.actions';

import './MovieListItem.styles.css';

const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';

const MovieListItem = ({
  movie,
  addMovie,
  history,
  toggleAutocomplete,
  condensed,
  existingMovies,
}) => {
  const handleAddToTimeline = (movieToAdd) => {
    addMovie(movieToAdd);
    toggleAutocomplete(false);
    history.push('/timeline');
  };

  const releaseYear = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  const posterSrc = (posterPath) => {
    if (posterPath) {
      return `${TMDB_BASE_IMAGE_URL}/w185${posterPath}`;
    }

    return 'https://via.placeholder.com/185x278?text=Image%0AUnavailable';
  };

  const movieAlreadyExists = (id) => {
    return existingMovies.some((existingMovie) => existingMovie.id === id);
  };

  if (condensed) {
    return (
      <li className="movie-list-item movie-list-item--condensed">
        <div className="movie-list-item__image-wrap">
          <img
            src={posterSrc(movie.poster_path)}
            alt={`${movie.title} Movie Poster`}
            className="movie-list-item__image"
          />
        </div>
        <div className="movie-list-item__content">
          <p className="movie-list-item__title">
            {movie.title} ({releaseYear(movie.release_date)}) | {movie.runtime}{' '}
            minutes
          </p>

          <button
            className="btn"
            type="button"
            onClick={handleAddToTimeline.bind(this, movie)}
            disabled={movieAlreadyExists(movie.id)}
          >
            Add to marathon
          </button>
          {movieAlreadyExists(movie.id) ? (
            <em>Already in your marathon</em>
          ) : (
            ''
          )}
        </div>
      </li>
    );
  }

  return (
    <li className="movie-list-item card">
      <div className="movie-list-item__image-wrap">
        <img
          src={posterSrc(movie.poster_path)}
          alt={`${movie.title} Movie Poster`}
          className="movie-list-item__image"
        />
      </div>
      <div className="movie-list-item__content">
        <p className="movie-list-item__title">{movie.title}</p>
        <p>{releaseYear(movie.release_date)}</p>
        <p>{movie.runtime} minutes</p>
      </div>

      <button
        className="teal btn-flat white-text movie-list-item__add"
        type="button"
        onClick={handleAddToTimeline.bind(this, movie)}
        disabled={movieAlreadyExists(movie.id)}
      >
        {movieAlreadyExists(movie.id) ? (
          <em>Already in your marathon</em>
        ) : (
          'Add to marathon'
        )}
      </button>
    </li>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.shape(moviePropType).isRequired,
};

function mapStateToProps(state) {
  return { existingMovies: state.timeline.movies };
}

const mapDispatchToProps = (dispatch) => ({
  addMovie: (movie, start) => dispatch(addMovie(movie, start)),
  toggleAutocomplete: (shouldShow) => dispatch(toggleAutocomplete(shouldShow)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieListItem)
);
