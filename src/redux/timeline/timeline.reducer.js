import timelineActionTypes from 'Redux/timeline/timeline.types';

export const INITIAL_STATE = {
  targetLength: 0,
  currentLength: 0,
  padding: 0,
  movies: [],
};

const startAfterLastMovie = (state) => {
  const padding = state.movies.length === 0 ? 0 : state.padding;

  return state.currentLength + padding;
};

const calculateCurrentLength = (state, runtime) => {
  const padding = state.movies.length === 0 ? 0 : state.padding;

  return state.currentLength + padding + runtime;
};

const timelineReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case timelineActionTypes.ADD_MOVIE: {
      const movieToAdd = { ...action.payload.movie };

      if (action.payload.start) {
        movieToAdd.start = action.payload.start;
      } else {
        movieToAdd.start = startAfterLastMovie(state);
      }

      movieToAdd.finish = movieToAdd.start + movieToAdd.runtime;

      return {
        ...state,
        currentLength: calculateCurrentLength(state, movieToAdd.runtime),
        movies: [...state.movies, movieToAdd],
      };
    }
    case timelineActionTypes.REMOVE_MOVIE: {
      const updatedMovies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );

      return {
        ...state,
        movies: updatedMovies,
      };
    }
    case timelineActionTypes.SHIFT_MOVIE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default timelineReducer;
