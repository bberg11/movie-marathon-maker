import axios from 'axios';

import config from 'Constants/config';
import searchActionTypes from 'Redux/search/search.types';

export const getResults = (query) => (dispatch) => {
  axios
    .get(
      `${config.TMDB_BASE_API_URL}/search/movie?api_key=${config.API_KEY}&query=${query}`
    )
    .then(({ data: { results } }) => {
      let movies = {};

      if (query.length < 2) {
        dispatch({
          type: searchActionTypes.UPDATE_RESULTS,
          payload: movies,
        });

        return;
      }

      results.forEach((movie) => {
        movies = {
          ...movies,
          [movie.id]: movie,
        };

        axios
          .get(
            `${config.TMDB_BASE_API_URL}/movie/${movie.id}?api_key=${config.API_KEY}`
          )
          .then(({ data }) => {
            dispatch({
              type: searchActionTypes.UPDATE_RESULT,
              payload: {
                [data.id]: data,
              },
            });
          });
      });

      dispatch({
        type: searchActionTypes.UPDATE_RESULTS,
        payload: movies,
      });
    });
};

export const toggleAutocomplete = (shouldShow) => {
  return {
    type: searchActionTypes.TOGGLE_AUTOCOMPLETE,
    payload: shouldShow,
  };
};

export const setQuery = (query) => {
  return {
    type: searchActionTypes.SET_QUERY,
    payload: query,
  };
};
