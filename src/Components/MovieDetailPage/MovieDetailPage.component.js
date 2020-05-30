import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import config from 'Constants/config';

const MovieDetailPage = ({ match, location: { state } }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    if (state) {
      setMovie(state.movie);

      return;
    }

    axios
      .get(`${config.TMDB_BASE_API_URL}/movie/${id}?api_key=${config.API_KEY}`)
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
