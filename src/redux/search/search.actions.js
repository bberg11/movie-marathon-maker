/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import searchActionTypes from 'Redux/search/search.types';

const TMDB_BASE_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c61ec07a6f7727aa86819578ff11a754';

export const getResults = (query) => (dispatch) => {
  axios
    .get(`${TMDB_BASE_API_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
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
          .get(`${TMDB_BASE_API_URL}/movie/${movie.id}?api_key=${API_KEY}`)
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
