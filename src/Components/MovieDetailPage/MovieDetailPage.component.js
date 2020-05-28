import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TMDB_BASE_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c61ec07a6f7727aa86819578ff11a754';

const MovieDetailPage = ({ match, location: { state } }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    if (state) {
      setMovie(state.movie);

      return;
    }

    axios
      .get(`${TMDB_BASE_API_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(({ data }) => {
        setMovie(data);
      });
  }, [state]);

  if (!movie) {
    return '';
  }

  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  );
};

export default MovieDetailPage;
