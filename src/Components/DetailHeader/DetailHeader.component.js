import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  detailImageSrc,
  releaseYear,
  getTheatricalRelease,
  convertMinutesForDisplay,
  movieAlreadyExists,
  buttonText,
  buttonClassName,
} from 'Constants/utilities';
import config from 'Constants/config';
import propShapes from 'Constants/propShapes';
import { addMovie } from 'Redux/timeline/timeline.actions';
import { addMessage } from 'Redux/flash/flash.actions';
import MovieTrailers from 'Components/MovieTrailers/MovieTrailers.component';
import Button from 'Components/Button/Button.component';

import './DetailHeader.styles.scss';

const DetailHeader = ({
  currentLength,
  directedBy,
  dispatch,
  existingMovies,
  lengthMode,
  movie,
  targetLength,
}) => {
  const history = useHistory();

  const addToMarathonButtonData = {
    currentLength,
    existingMovies,
    lengthMode,
    targetLength,
    id: movie.id,
    runtime: movie.runtime,
  };

  const trailers = movie.videos.results.filter((video) => {
    return video.site === 'YouTube' && video.type === 'Trailer';
  });

  const { release_date: releaseDate, certification } = getTheatricalRelease(
    movie.release_dates
  );

  const releaseDateDisplay = new Date(releaseDate).toLocaleDateString();

  const renderGenres = (genre) => {
    return <li key={genre.name}>{genre.name}</li>;
  };

  return (
    <div className="detail-header">
      <div
        className="detail-header__bg"
        style={{
          backgroundImage: `url(${config.TMDB_BASE_IMAGE_URL}/original${movie.backdrop_path})`,
        }}
      />
      <div className="detail-header__wrapper">
        <div className="detail-header__cell">
          <img
            srcSet={`${detailImageSrc(movie.poster_path)['1x']} 1x, ${
              detailImageSrc(movie.poster_path)['2x']
            } 2x`}
            src={detailImageSrc(movie.poster_path)['2x']}
            alt={`${movie.title} Movie Poster`}
            className="detail-header__poster"
          />
          <MovieTrailers trailers={trailers} />
        </div>
        <div className="detail-header__cell detail-header__cell--info">
          <h1>
            {movie.title} ({releaseYear(movie.release_date)})
          </h1>
          <p>{convertMinutesForDisplay(movie.runtime)}</p>
          <p>
            {certification} | {releaseDateDisplay}
          </p>
          <ul>{movie.genres.map(renderGenres)}</ul>
          <p>{movie.tagline}</p>
          <h2 className="heading heading--5">Overview</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Directed by: </strong> {directedBy.join(', ')}
          </p>
          <div className="detail-header__add-section">
            <Button
              type="button"
              className={`button button--full button--large ${buttonClassName(
                addToMarathonButtonData
              )}`}
              disabled={movieAlreadyExists(addToMarathonButtonData)}
              onClick={() => {
                dispatch(addMovie(movie));
                dispatch(
                  addMessage(
                    `"${movie.title}" has been added to your marathon`,
                    'success'
                  )
                );
                history.push('/timeline');
              }}
            >
              {buttonText(addToMarathonButtonData)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailHeader.propTypes = {
  currentLength: PropTypes.number.isRequired,
  directedBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  existingMovies: PropTypes.arrayOf(PropTypes.shape(propShapes.movie))
    .isRequired,
  lengthMode: PropTypes.string.isRequired,
  movie: PropTypes.shape(propShapes.movie).isRequired,
  targetLength: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentLength: state.timeline.currentLength,
    existingMovies: state.timeline.movies,
    lengthMode: state.timeline.settings.lengthMode,
    targetLength: state.timeline.settings.length,
  };
};

export default connect(mapStateToProps)(DetailHeader);
