/* eslint-disable react/jsx-no-bind */
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import lineClamp from 'line-clamp';
import classNames from 'classnames';

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
import Button from 'Components/Button/Button.component';

import './MovieListItem.styles.scss';

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
  const overviewTextRef = useRef();
  const overviewText = movie.overview;

  useEffect(() => {
    lineClamp(overviewTextRef.current, 3);
  }, [overviewText]);

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
      return {
        '1x': `${config.TMDB_BASE_IMAGE_URL}/w185${posterPath}`,
        '2x': `${config.TMDB_BASE_IMAGE_URL}/w342${posterPath}`,
      };
    }

    return {
      '1x': config.PLACEHOLDER_IMAGE_1X,
      '2x': config.PLACEHOLDER_IMAGE_2X,
    };
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
    return runtimeExceedsLength(runtime) ? 'button--secondary-color' : '';
  };

  const buttonText = ({ id, runtime }) => {
    const defaultText = 'Add to marathon';

    if (movieAlreadyExists(id)) {
      return 'Already in your marathon';
    }

    if (runtimeExceedsLength(runtime)) {
      return `${defaultText} (Will overflow length)`;
    }

    return defaultText;
  };

  return (
    <li
      className={classNames({
        'movie-list-item': true,
        'movie-list-item--condensed': condensed,
        'movie-list-item--already-exists': movieAlreadyExists(movie.id),
        'movie-list-item--will-overflow': runtimeExceedsLength(movie.runtime),
      })}
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
        <div className="movie-list-item__details">
          <div className="movie-list-item__image-wrap">
            <img
              srcSet={`${posterSrc(movie.poster_path)['1x']} 1x, ${
                posterSrc(movie.poster_path)['2x']
              } 2x`}
              src={posterSrc(movie.poster_path)['2x']}
              alt={`${movie.title} Movie Poster`}
              className="movie-list-item__image"
            />
          </div>
          <div className="movie-list-item__content">
            <h2 className="movie-list-item__title heading heading--4 heading--no-margin">
              {movie.title}
            </h2>
            <p className="movie-list-item__meta">
              {releaseYear(movie.release_date)} |{' '}
              <strong>{movie.runtime} minutes</strong>
            </p>
            <p className="movie-list-item__overview" ref={overviewTextRef}>
              {overviewText}
            </p>
          </div>
        </div>
        <div className="movie-list-item__action">
          <Button
            modifier={`button--full ${buttonClassName(movie.runtime)}`}
            type="button"
            clickHandler={handleAddToTimeline.bind(this, movie)}
            disabled={movieAlreadyExists(movie.id)}
          >
            {buttonText(movie)}
          </Button>
        </div>
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
