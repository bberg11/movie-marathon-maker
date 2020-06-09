import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import config from 'Constants/config';
import DetailHeader from 'Components/DetailHeader/DetailHeader.component';
import CastDetails from 'Components/CastDetails/CastDetails.component';
import CrewDetails from 'Components/CrewDetails/CrewDetails.component';
import MovieList from 'Components/MovieList/MovieList.component';

import './MovieDetailPage.styles.scss';

const MovieDetailPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [similarMovies, setSimilarMovies] = useState({});
  const [cast, setCast] = useState();
  const [crew, setCrew] = useState();
  const [crewDetailsHeight, setCrewDetailsHeight] = useState();

  const formatMovies = (movies) => {
    let formattedMovies = {};

    movies.forEach((tempMovie) => {
      formattedMovies = {
        ...formattedMovies,
        [tempMovie.id]: tempMovie,
      };
    });

    return formattedMovies;
  };

  useEffect(() => {
    axios
      .get(
        `${config.TMDB_BASE_API_URL}/movie/${id}?api_key=${config.API_KEY}&append_to_response=similar,credits,videos,release_dates`
      )
      .then(({ data }) => {
        setMovie(data);
        setSimilarMovies(formatMovies(data.similar.results.slice(0, 5)));
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

MovieDetailPage.propTypes = {};

export default MovieDetailPage;
