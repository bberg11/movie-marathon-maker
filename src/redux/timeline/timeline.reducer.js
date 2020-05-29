import timelineActionTypes from 'Redux/timeline/timeline.types';

export const INITIAL_STATE = {
  settings: {
    lengthMode: 'time',
    length: 0,
    padding: 0,
  },
  currentLength: 0,
  movies: [],
};

const movieAlreadyExists = (existingMovies, id) => {
  return existingMovies.some((movie) => movie.id === id);
};

const getCurrentLength = (movies) => {
  const runtimes = movies.map((movie) => movie.runtime);

  return runtimes.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
};

const updateStartFinishTimes = (movies) => {
  return movies;
};

const timelineReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case timelineActionTypes.ADD_MOVIE: {
      if (movieAlreadyExists(state.movies, action.payload.movie.id)) {
        return state;
      }

      const movies = updateStartFinishTimes([
        ...state.movies,
        action.payload.movie,
      ]);

      return {
        ...state,
        currentLength: getCurrentLength(movies),
        movies,
      };
    }

    case timelineActionTypes.REMOVE_MOVIE: {
      let movies = state.movies.filter((movie) => movie.id !== action.payload);

      movies = updateStartFinishTimes(movies);

      return {
        ...state,
        currentLength: getCurrentLength(movies),
        movies,
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

    case timelineActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    default:
      return state;
  }
};

export default timelineReducer;
