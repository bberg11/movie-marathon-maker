/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdHighlightOff } from 'react-icons/md';

import config from 'Constants/config';
import { getDisplayTimeFromStart } from 'Constants/utilities';
import propShapes from 'Constants/propShapes';
import { removeMovie as removeMovieAction } from 'Redux/timeline/timeline.actions';

import './TimelineMovie.styles.scss';

const TimelineMovie = ({ movie, removeMovie, startDateTime }) => {
  return (
    <li
      key={movie.id}
      className="timeline-movie"
      style={{
        top: movie.startTime * config.MINUTE_TO_PIXEL_FACTOR,
        height: movie.runtime * config.MINUTE_TO_PIXEL_FACTOR,
      }}
    >
      <div
        className="timeline-movie__bg"
        style={{
          backgroundImage: `url(${config.TMDB_BASE_IMAGE_URL}/original${movie.backdrop_path})`,
        }}
      />
      <div className="timeline-movie__content">
        <p className="timeline-movie__start">
          <button
            type="button"
            className="timeline-movie__node"
            title="View time"
          />
          <span className="timeline-movie__node-text">
            {getDisplayTimeFromStart(startDateTime, movie.startTime)}
          </span>
        </p>
        <h2 className="timeline-movie__title">
          <Link
            to={{
              pathname: `/movie/${movie.id}`,
              state: {
                movie,
              },
            }}
          >
            {movie.title}
          </Link>
        </h2>
        <p className="timeline-movie__finish">
          <button
            type="button"
            className="timeline-movie__node"
            title="View time"
          />
          <span className="timeline-movie__node-text">
            {getDisplayTimeFromStart(startDateTime, movie.finishTime)}
          </span>
        </p>
        <div className="timeline-movie__remove">
          <button
            className="button-reset"
            type="button"
            onClick={() => removeMovie(movie.id)}
          >
            <MdHighlightOff />
          </button>
        </div>
      </div>
    </li>
  );
};

TimelineMovie.propTypes = {
  movie: PropTypes.shape(propShapes.movie).isRequired,
  removeMovie: PropTypes.func.isRequired,
  startDateTime: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeMovie: (id) => dispatch(removeMovieAction(id)),
});

export default connect(null, mapDispatchToProps)(TimelineMovie);
