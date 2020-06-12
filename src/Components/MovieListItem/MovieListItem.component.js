/* eslint-disable react/jsx-no-bind */
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import lineClamp from 'line-clamp';
import classNames from 'classnames';

import propShapes from 'Constants/propShapes';
import {
  cardImageSrc,
  movieAlreadyExists,
  buttonText,
  buttonClassName,
  runtimeExceedsLength,
} from 'Constants/utilities';
import { addMovie, updatePadding } from 'Redux/timeline/timeline.actions';
import { toggleAutocomplete, setQuery } from 'Redux/search/search.actions';
import { addMessage } from 'Redux/flash/flash.actions';
import Button from 'Components/Button/Button.component';

import './MovieListItem.styles.scss';

const MovieListItem = ({
  condensed,
  currentLength,
  dispatch,
  existingMovies,
  lengthMode,
  movie,
  padding,
  targetLength,
}) => {
  const history = useHistory();
  const overviewTextRef = useRef();
  const overviewText = movie.overview;
  const addToMarathonButtonData = {
    currentLength,
    existingMovies,
    lengthMode,
    targetLength,
    id: movie.id,
    runtime: movie.runtime,
  };

  useEffect(() => {
    lineClamp(overviewTextRef.current, 3);
  }, [overviewText]);

  const handleAddToTimeline = (movieToAdd, event) => {
    event.preventDefault();

    dispatch(addMovie(movieToAdd));
    dispatch(toggleAutocomplete(false));
    dispatch(setQuery(''));

    if (lengthMode === 'time' && padding > 0) {
      dispatch(updatePadding('even'));
    }

    dispatch(
      addMessage(`"${movie.title}" has been added to your marathon`, 'success')
    );
    history.push('/timeline');
  };

  const handleLinkClick = () => {
    dispatch(toggleAutocomplete(false));
    dispatch(setQuery(''));
  };

  const releaseYear = (dateString) => {
    return new Date(dateString).getFullYear().toString();
  };

  return (
    <li
      className={classNames({
        'movie-list-item': true,
        'movie-list-item--condensed': condensed,
        'movie-list-item--already-exists': movieAlreadyExists(
          addToMarathonButtonData
        ),
        'movie-list-item--will-overflow': runtimeExceedsLength(
          addToMarathonButtonData
        ),
      })}
    >
      <Link
        to={{
          pathname: `/movie/${movie.id}`,
        }}
        className="movie-list-item__link"
        onClick={handleLinkClick}
      >
        <div className="movie-list-item__details">
          <div className="movie-list-item__image-wrap">
            <img
              srcSet={`${cardImageSrc(movie.poster_path)['1x']} 1x, ${
                cardImageSrc(movie.poster_path)['2x']
              } 2x`}
              src={cardImageSrc(movie.poster_path)['2x']}
              alt={`${movie.title} Movie Poster`}
              className="movie-list-item__image"
            />
          </div>
          <div className="movie-list-item__content">
            <h2 className="movie-list-item__title heading heading--4 heading--no-margin">
              {movie.title}
            </h2>
            <p className="movie-list-item__meta">
              {releaseYear(movie.release_date)}
              {!condensed ? (
                <strong className="movie-list-item__runtime">
                  {movie.runtime} minutes
                </strong>
              ) : (
                ''
              )}
            </p>
            <p className="movie-list-item__overview" ref={overviewTextRef}>
              {overviewText}
            </p>
          </div>
        </div>
        <div className="movie-list-item__action">
          <Button
            className={`button button--full ${buttonClassName(
              addToMarathonButtonData
            )}`}
            type="button"
            onClick={handleAddToTimeline.bind(this, movie)}
            disabled={movieAlreadyExists(addToMarathonButtonData)}
          >
            {buttonText(addToMarathonButtonData)}
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
  condensed: PropTypes.bool,
  currentLength: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  existingMovies: PropTypes.arrayOf(PropTypes.shape(propShapes.movie))
    .isRequired,
  lengthMode: PropTypes.string.isRequired,
  movie: PropTypes.shape(propShapes.movie).isRequired,
  padding: PropTypes.number.isRequired,
  targetLength: PropTypes.number.isRequired,
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

export default connect(mapStateToProps)(MovieListItem);
