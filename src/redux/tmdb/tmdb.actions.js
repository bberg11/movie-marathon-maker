/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import tmdbActionTypes from 'Redux/tmdb/tmdb.types';
import config from 'Utilities/config';

export const getTMDBConfig = () => (dispatch) => {
  axios
    .get(`${config.TMDB_BASE_API_URL}/configuration?api_key=${config.API_KEY}`)
    .then(({ data }) => {
      dispatch({
        type: tmdbActionTypes.UPDATE_CONFIG,
        payload: {
          ...data,
          timestamp: new Date(),
        },
      });
    });
};
