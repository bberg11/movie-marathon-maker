import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import config from 'Constants/config';
import propShapes from 'Constants/propShapes';
import DetailHeader from 'Components/DetailHeader/DetailHeader.component';
import CastDetails from 'Components/CastDetails/CastDetails.component';
import CrewDetails from 'Components/CrewDetails/CrewDetails.component';
import MovieList from 'Components/MovieList/MovieList.component';

import './MovieDetailPage.styles.scss';

const MovieDetailPage = ({ existingMovies }) => {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [similarMovies, setSimilarMovies] = useState({});
  const [cast, setCast] = useState();
  const [crew, setCrew] = useState();
  const [crewDetailsHeight, setCrewDetailsHeight] = useState();

  const getSimilarMoviesNotInMarathon = (allSimilarMovies) => {
    const existingMovieIDs = existingMovies.map((thisMovie) => thisMovie.id);
    const movies = [];

    for (let index = 0; movies.length < 5; index += 1) {
      const thisMovie = allSimilarMovies[index];

      if (!existingMovieIDs.includes(thisMovie.id)) {
        movies.push(thisMovie);
      }
    }

    return movies;
  };

  const getSimilarMovieDetails = (movies) => {
    const requests = [];

    movies.forEach((tempMovie) => {
      const request = axios.get(
        `${config.TMDB_BASE_API_URL}/movie/${tempMovie.id}?api_key=${config.API_KEY}`
      );

      requests.push(request);
    });

    Promise.all(requests).then((values) => {
      let formattedMovies = {};

      values.forEach(({ data }) => {
        formattedMovies = {
          ...formattedMovies,
          [data.id]: data,
        };
      });

      setSimilarMovies(formattedMovies);
    });
  };

  useEffect(() => {
    axios
      .get(
        `${config.TMDB_BASE_API_URL}/movie/${id}?api_key=${config.API_KEY}&append_to_response=similar,credits,videos,release_dates`
      )
      .then(({ data }) => {
        getSimilarMovieDetails(
          getSimilarMoviesNotInMarathon(data.similar.results)
        );
        setMovie(data);
        setCast(data.credits.cast);
        setCrew(data.credits.crew);
      });
  }, [id]);

  if (!movie) {
    return '';
  }

  const directedBy = () => {
    if (!crew) {
      return [];
    }

    const directors = crew.filter(
      (crewMember) => crewMember.job === 'Director'
    );

    return directors.map((director) => director.name);
  };

  return (
    <section className="movie-detail-page">
      <div className="movie-detail-page__header">
        <DetailHeader movie={movie} directedBy={directedBy()} />
      </div>
      <div className="movie-detail-page__body">
        <div className="movie-detail-page__row">
          <CastDetails cast={cast} />
        </div>

        <div className="movie-detail-page__row">
          <div className="movie-detail-page__cell">
            <CrewDetails
              crew={crew}
              setCrewDetailsHeight={setCrewDetailsHeight}
            />
          </div>
          <div className="movie-detail-page__cell">
            <div
              style={{
                height: crewDetailsHeight,
                overflow: 'auto',
              }}
            >
              <h2>Try these</h2>
              <MovieList results={similarMovies} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MovieDetailPage.propTypes = {
  existingMovies: PropTypes.arrayOf(PropTypes.shape(propShapes.movie))
    .isRequired,
};

const mapStateToProps = (state) => ({
  existingMovies: state.timeline.movies,
});

export default connect(mapStateToProps)(MovieDetailPage);
