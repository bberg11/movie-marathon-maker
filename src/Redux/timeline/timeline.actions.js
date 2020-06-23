/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import config from 'Utilities/config';
import timelineActionTypes from 'Redux/timeline/timeline.types';

export const updateStartFinishTimes = () => {
  return {
    type: timelineActionTypes.UPDATE_START_FINISH_TIMES,
  };
};

export const addMovie = (movie) => (dispatch) => {
  if (!movie.runtime) {
    axios
      .get(
        `${config.TMDB_BASE_API_URL}/movie/${movie.id}?api_key=${config.API_KEY}`
      )
      .then(({ data }) => {
        dispatch({
          type: timelineActionTypes.ADD_MOVIE,
          payload: {
            ...movie,
            ...data,
          },
        });

        dispatch(updateStartFinishTimes());
      });
  } else {
    dispatch({
      type: timelineActionTypes.ADD_MOVIE,
      payload: movie,
    });

    dispatch(updateStartFinishTimes());
  }
};

export const removeMovie = (movieId) => (dispatch) => {
  dispatch({
    type: timelineActionTypes.REMOVE_MOVIE,
    payload: movieId,
  });

  dispatch(updateStartFinishTimes());
};

export const reorderMovies = (movies) => (dispatch) => {
  dispatch({
    type: timelineActionTypes.REORDER_MOVIES,
    payload: movies,
  });

  dispatch(updateStartFinishTimes());
};

export const resetMarathon = () => {
  return {
    type: timelineActionTypes.RESET,
  };
};

export const updateSettings = (settings) => {
  return {
    type: timelineActionTypes.UPDATE_SETTINGS,
    payload: settings,
  };
};

export const updatePadding = (padding) => (dispatch) => {
  dispatch({
    type: timelineActionTypes.UPDATE_PADDING,
    payload: padding,
  });

  dispatch(updateStartFinishTimes());
};
