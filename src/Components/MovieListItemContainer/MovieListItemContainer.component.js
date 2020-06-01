import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import MovieListItem from 'Components/MovieListItem/MovieListItem.component';
import MovieListItemCondensed from 'Components/MovieListItemCondensed/MovieListItemCondensed.component';

const MovieListItemContainer = ({
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

  const Component = condensed ? MovieListItemCondensed : MovieListItem;

  return (
    <Component
      buttonClassName={buttonClassName(movie.runtime)}
      handleAddToTimeline={handleAddToTimeline}
      handleLinkClick={handleLinkClick}
      movie={movie}
      movieAlreadyExists={movieAlreadyExists(movie.id)}
      posterSrc={posterSrc(movie.poster_path)}
      releaseYear={releaseYear(movie.release_date)}
      runtimeExceedsLength={runtimeExceedsLength(movie.runtime)}
    />
  );
};

MovieListItemContainer.defaultProps = {
  condensed: false,
};

MovieListItemContainer.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieListItemContainer);
