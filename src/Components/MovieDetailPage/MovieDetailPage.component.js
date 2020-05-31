import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import propShapes from 'Constants/propShapes';
import config from 'Constants/config';

const MovieDetailPage = ({ location: { state } }) => {
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

MovieDetailPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      movie: PropTypes.shape(propShapes.movie),
    }),
  }).isRequired,
};

export default MovieDetailPage;
