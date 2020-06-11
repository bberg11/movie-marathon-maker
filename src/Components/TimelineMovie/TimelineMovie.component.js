/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import config from 'Constants/config';
import { getDisplayTimeFromStart } from 'Constants/utilities';
import propShapes from 'Constants/propShapes';
import { removeMovie as removeMovieAction } from 'Redux/timeline/timeline.actions';
import { addMessage } from 'Redux/flash/flash.actions';
import Button from 'Components/Button/Button.component';

import './TimelineMovie.styles.scss';

const TimelineMovie = ({ addFlash, movie, removeMovie, startDateTime }) => {
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
        <div
          className="timeline-movie__remove"
          style={{ width: movie.runtime * config.MINUTE_TO_PIXEL_FACTOR }}
        >
          <Button
            className="button button--danger-color button--full"
            type="button"
            onClick={() => {
              removeMovie(movie.id);
              addFlash(
                `"${movie.title}" has been removed from your marathon`,
                'success'
              );
            }}
          >
            Remove
          </Button>
        </div>
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
      </div>
    </li>
  );
};

TimelineMovie.propTypes = {
  addFlash: PropTypes.func.isRequired,
  movie: PropTypes.shape(propShapes.movie).isRequired,
  removeMovie: PropTypes.func.isRequired,
  startDateTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeMovie: (id) => dispatch(removeMovieAction(id)),
  addFlash: (message, type) => dispatch(addMessage(message, type)),
});

export default connect(null, mapDispatchToProps)(TimelineMovie);
