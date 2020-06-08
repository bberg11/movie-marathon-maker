import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import config from 'Constants/config';

import './MovieDetailPage.styles.scss';

const MovieDetailPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  const [movieCredits, setMovieCredits] = useState();
  const [trailers, setTrailers] = useState();

  useEffect(() => {
    axios
      .get(
        `${config.TMDB_BASE_API_URL}/movie/${id}?api_key=${config.API_KEY}&append_to_response=similar,credits,videos`
      )
      .then(({ data }) => {
        setMovie(data);
        setSimilarMovies(data.similar.results);
        setMovieCredits(data.credits);
        setTrailers(
          data.videos.results.filter((video) => {
            return video.site === 'YouTube' && video.type === 'Trailer';
          })
        );
      });
  }, [id]);

  if (!movie) {
    return '';
  }

  return (
    <section className="movie-detail-page">
      <h1>{movie.title}</h1>
    </section>
  );
};

MovieDetailPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      movie: PropTypes.shape(propShapes.movie),
    }),
  }).isRequired,
};

export default MovieDetailPage;
