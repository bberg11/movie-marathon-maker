/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import searchActionTypes from 'Redux/search/search.types';

const TMDB_BASE_API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c61ec07a6f7727aa86819578ff11a754';

export const getResults = (query) => (dispatch) => {
  axios
    .get(`${TMDB_BASE_API_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then(({ data: { results } }) => {
      results.forEach((movie) => {
        const payload = {
          [movie.id]: movie,
        };

        dispatch({
          type: searchActionTypes.UPDATE_RESULTS,
          payload,
        });

        axios
          .get(`${TMDB_BASE_API_URL}/movie/${movie.id}?api_key=${API_KEY}`)
          .then(({ data }) => {
            dispatch({
              type: searchActionTypes.UPDATE_RESULTS,
              payload: {
                [data.id]: data,
              },
            });
          });
      });
    });
};
