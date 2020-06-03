import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import config from 'Constants/config';
import {
  addMovie as addMovieAction,
  updatePadding as updatePaddingAction,
} from 'Redux/timeline/timeline.actions';
import {
  toggleAutocomplete as toggleAutocompleteAction,
  setQuery as setQueryAction,
} from 'Redux/search/search.actions';

const MovieListItem = ({
  addMovie,
  condensed,
  currentLength,
  existingMovies,
  lengthMode,
  movie,
  padding,
  setQuery,
  targetLength,
  toggleAutocomplete,
  updatePadding,
}) => {
  const history = useHistory();

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
    return new Date(dateString).getFullYear().toString();
  };

  const posterSrc = (posterPath) => {
    if (posterPath) {
      return `${config.TMDB_BASE_IMAGE_URL}/w185${posterPath}`;
    }

    return config.PLACEHOLDER_IMAGE;
  };

  const movieAlreadyExists = (id) => {
    return existingMovies.some((existingMovie) => existingMovie.id === id);
  };

  const runtimeExceedsLength = (runtime) => {
    if (lengthMode === 'movie') {
      return existingMovies.length >= targetLength;
    }

    return currentLength + runtime > targetLength;
  };

  const buttonClassName = (runtime) => {
    return runtimeExceedsLength(runtime) ? 'red' : 'teal';
  };

  return (
    <li
      className={`movie-list-item${
        condensed ? ' movie-list-item---condensed' : ''
      }`}
    >
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
            src={posterSrc(movie.poster_path)}
            alt={`${movie.title} Movie Poster`}
            className="movie-list-item__image"
          />
        </div>
        <div className="movie-list-item__content">
          <p className="movie-list-item__title">{movie.title}</p>
          <p>{releaseYear(movie.release_date)}</p>
          <p>{movie.runtime} minutes</p>

          {runtimeExceedsLength(movie.runtime) &&
          !movieAlreadyExists(movie.id) ? (
            <em>
              Adding this movie will extend your marathon beyond its length
            </em>
          ) : (
            ''
          )}
        </div>

        <button
          className={`movie-list-item__add ${buttonClassName(movie.runtime)}`}
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

MovieListItem.defaultProps = {
  condensed: false,
};

MovieListItem.propTypes = {
  addMovie: PropTypes.func.isRequired,
  condensed: PropTypes.bool,
  currentLength: PropTypes.number.isRequired,
  existingMovies: PropTypes.arrayOf(PropTypes.shape(propShapes.movie))
    .isRequired,
  lengthMode: PropTypes.string.isRequired,
  movie: PropTypes.shape(propShapes.movie).isRequired,
  padding: PropTypes.number.isRequired,
  setQuery: PropTypes.func.isRequired,
  targetLength: PropTypes.number.isRequired,
  toggleAutocomplete: PropTypes.func.isRequired,
  updatePadding: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentLength: state.timeline.currentLength,
    existingMovies: state.timeline.movies,
    lengthMode: state.timeline.settings.lengthMode,
    padding: state.timeline.settings.padding,
    targetLength: state.timeline.settings.length,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addMovie: (movie, start) => dispatch(addMovieAction(movie, start)),
  setQuery: (query) => dispatch(setQueryAction(query)),
  toggleAutocomplete: (shouldShow) =>
    dispatch(toggleAutocompleteAction(shouldShow)),
  updatePadding: (padding) => dispatch(updatePaddingAction(padding)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListItem);
