/* eslint-disable import/prefer-default-export */
import timelineActionTypes from 'Redux/timeline/timeline.types';

export const addMovie = (movie, start) => {
  return {
    type: timelineActionTypes.ADD_MOVIE,
    payload: {
      movie,
      start,
    },
  };
};

export const removeMovie = (movieId) => {
  return {
    type: timelineActionTypes.REMOVE_MOVIE,
    payload: movieId,
  };
};

export const shiftMovie = (movieId) => {
  return {
    type: timelineActionTypes.SHIFT_MOVIE,
    payload: movieId,
  };
};
