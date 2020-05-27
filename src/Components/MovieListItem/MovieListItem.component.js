import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { movie as moviePropType } from 'propTypes';

import { addMovie } from 'Redux/timeline/timeline.actions';
import { toggleAutocomplete } from 'Redux/search/search.actions';

import 'Components/MovieListItem/MovieListItem.styles.css';

const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';

const MovieListItem = ({ movie, addMovie, history, toggleAutocomplete }) => {
  const handleAddToTimeline = (movieToAdd) => {
    addMovie(movieToAdd);
    toggleAutocomplete(false);
    history.push('/timeline');
  };

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
        <button
          className="btn"
          type="button"
          onClick={handleAddToTimeline.bind(this, movie)}
        >
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
  toggleAutocomplete: (shouldShow) => dispatch(toggleAutocomplete(shouldShow)),
});

export default withRouter(connect(null, mapDispatchToProps)(MovieListItem));
