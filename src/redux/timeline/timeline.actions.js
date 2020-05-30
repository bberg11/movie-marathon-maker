/* eslint-disable import/prefer-default-export */
import timelineActionTypes from 'Redux/timeline/timeline.types';

export const updateStartFinishTimes = () => {
  return {
    type: timelineActionTypes.UPDATE_START_FINISH_TIMES,
  };
};

export const addMovie = (movie) => (dispatch) => {
  dispatch({
    type: timelineActionTypes.ADD_MOVIE,
    payload: movie,
  });

  dispatch(updateStartFinishTimes());
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
