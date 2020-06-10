import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  detailImageSrc,
  releaseYear,
  getTheatricalRelease,
  convertMinutesForDisplay,
} from 'Constants/utilities';
import config from 'Constants/config';
import propShapes from 'Constants/propShapes';
import { addMovie as addMovieAction } from 'Redux/timeline/timeline.actions';
import MovieTrailers from 'Components/MovieTrailers/MovieTrailers.component';
import Button from 'Components/Button/Button.component';

import './DetailHeader.styles.scss';

const DetailHeader = ({ addMovie, movie, directedBy }) => {
  const history = useHistory();

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
          <h2 className="heading heading--6">Overview</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Directed by: </strong> {directedBy.join(', ')}
          </p>
          <div className="detail-header__add-section">
            <Button
              type="button"
              modifier="button--full button--large"
              clickHandler={() => {
                addMovie(movie);
                history.push('/timeline');
              }}
            >
              Add to Marathon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailHeader.propTypes = {
  addMovie: PropTypes.func.isRequired,
  movie: PropTypes.shape(propShapes.movie).isRequired,
  directedBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addMovie: (movie) => dispatch(addMovieAction(movie)),
});

export default connect(null, mapDispatchToProps)(DetailHeader);
