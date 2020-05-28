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

export const reorderMovies = (movies) => {
  return {
    type: timelineActionTypes.REORDER_MOVIES,
    payload: movies,
  };
};

export const resetMarathon = () => {
  return {
    type: timelineActionTypes.RESET,
  };
};
