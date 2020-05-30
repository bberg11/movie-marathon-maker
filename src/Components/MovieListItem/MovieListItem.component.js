import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { movie as moviePropType } from 'propTypes';

import { addMovie, updatePadding } from 'Redux/timeline/timeline.actions';
import { toggleAutocomplete, setQuery } from 'Redux/search/search.actions';

import './MovieListItem.styles.css';

const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';

const MovieListItem = ({
  movie,
  addMovie,
  history,
  toggleAutocomplete,
  condensed,
  existingMovies,
  setQuery,
  currentLength,
  targetLength,
  lengthMode,
  padding,
  updatePadding,
}) => {
  const handleAddToTimeline = (movieToAdd, event) => {
    event.preventDefault();

    addMovie(movieToAdd);
    toggleAutocomplete(false);
    setQuery('');

    if (lengthMode === 'time' && padding > 0) {
      updatePadding('even');
    }

    history.push('/timeline');
  };

  const handleLinkClick = () => {
    toggleAutocomplete(false);
    setQuery('');
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

  const runtimeExceedsLength = (runtime) => {
    return currentLength + runtime > targetLength;
  };

  const buttonColor = (runtime) => {
    return runtimeExceedsLength(runtime) ? 'red' : 'teal';
  };

  if (condensed) {
    return (
      <li>
        <Link
          to={{
            pathname: `/movie/${movie.id}`,
            state: {
              movie,
            },
          }}
          className="movie-list-item movie-list-item--condensed"
          onClick={handleLinkClick}
        >
          <div className="movie-list-item__image-wrap">
            <img
              src={posterSrc(movie.poster_path)}
              alt={`${movie.title} Movie Poster`}
              className="movie-list-item__image"
            />
          </div>
          <div className="movie-list-item__content">
            <p className="movie-list-item__title">
              {movie.title} ({releaseYear(movie.release_date)}) |{' '}
              {movie.runtime} minutes
            </p>

            <button
              className={`btn ${buttonColor(movie.runtime)}`}
              type="button"
              onClick={handleAddToTimeline.bind(this, movie)}
              disabled={movieAlreadyExists(movie.id)}
            >
              Add to marathon
            </button>

            {runtimeExceedsLength(movie.runtime) ? (
              <em>
                Adding this movie will extend your marathon beyond its length
              </em>
            ) : (
              ''
            )}

            {movieAlreadyExists(movie.id) ? (
              <em>Already in your marathon</em>
            ) : (
              ''
            )}
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li className="card">
      <Link
        to={{
          pathname: `/movie/${movie.id}`,
          state: {
            movie,
          },
        }}
        className="movie-list-item"
      >
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

          {runtimeExceedsLength(movie.runtime) ? (
            <em>
              Adding this movie will extend your marathon beyond its length
            </em>
          ) : (
            ''
          )}
        </div>

        <button
          className={`btn-flat white-text movie-list-item__add ${buttonColor(
            movie.runtime
          )}`}
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
      </Link>
    </li>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.shape(moviePropType).isRequired,
};

function mapStateToProps(state) {
  return {
    existingMovies: state.timeline.movies,
    currentLength: state.timeline.currentLength,
    targetLength: state.timeline.settings.length,
    lengthMode: state.timeline.settings.lengthMode,
    padding: state.timeline.settings.padding,
  };
}

const mapDispatchToProps = (dispatch) => ({
  addMovie: (movie, start) => dispatch(addMovie(movie, start)),
  toggleAutocomplete: (shouldShow) => dispatch(toggleAutocomplete(shouldShow)),
  setQuery: (query) => dispatch(setQuery(query)),
  updatePadding: (padding) => dispatch(updatePadding(padding)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieListItem)
);
