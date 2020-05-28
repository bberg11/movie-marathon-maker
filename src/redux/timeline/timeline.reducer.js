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

const movieAlreadyExists = (movies, id) => {
  return movies.some((movie) => movie.id === id);
};

const timelineReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case timelineActionTypes.ADD_MOVIE: {
      if (movieAlreadyExists(state.movies, action.payload.movie.id)) {
        alert(`${action.payload.movie.title} is already in your marathon`);
        return state;
      }

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
      const movieToRemove = state.movies.find(
        (movie) => movie.id === action.payload
      );
      const updatedMovies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );

      return {
        ...state,
        currentLength: state.currentLength - movieToRemove.runtime,
        movies: updatedMovies,
      };
    }
    case timelineActionTypes.REORDER_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case timelineActionTypes.RESET:
      return {
        ...state,
        currentLength: 0,
        movies: [],
      };
    default:
      return state;
  }
};

export default timelineReducer;
