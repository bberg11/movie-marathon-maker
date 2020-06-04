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

const getCurrentLength = (movies, padding) => {
  const runtimes = movies.map((movie) => movie.runtime);
  let totalRuntime = runtimes.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  if (padding > 0) {
    totalRuntime += (movies.length - 1) * padding;
  }

  return totalRuntime;
};

const getTimeRemaining = (targetLength, currentLength) => {
  return targetLength - currentLength;
};

const getSpaceBetween = (timeRemaining, numberOfMovies) => {
  return timeRemaining / (numberOfMovies - 1);
};

const getPadding = (state) => {
  const timeRemaining = getTimeRemaining(
    state.settings.length,
    state.currentLength
  );

  if (timeRemaining <= 0) {
    return 0;
  }

  return getSpaceBetween(timeRemaining, state.movies.length);
};

const timelineReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case timelineActionTypes.ADD_MOVIE: {
      if (movieAlreadyExists(state.movies, action.payload.id)) {
        return state;
      }

      const movies = [...state.movies, action.payload];

      return {
        ...state,
        currentLength: getCurrentLength(movies, state.settings.padding),
        movies,
      };
    }

    case timelineActionTypes.REMOVE_MOVIE: {
      const movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );

      return {
        ...state,
        currentLength: getCurrentLength(movies, state.settings.padding),
        movies,
      };
    }

    case timelineActionTypes.REORDER_MOVIES: {
      return {
        ...state,
        movies: action.payload,
      };
    }

    case timelineActionTypes.UPDATE_START_FINISH_TIMES: {
      const { padding } = state.settings;
      let progress = 0;

      const movies = state.movies.map((movie, index) => {
        const startTime = index === 0 ? progress : progress + padding;
        const finishTime = startTime + movie.runtime;

        const updatedMovie = {
          ...movie,
          startTime,
          finishTime,
        };

        progress = finishTime;

        return updatedMovie;
      });

      return {
        ...state,
        movies,
      };
    }

    case timelineActionTypes.UPDATE_PADDING: {
      const padding =
        action.payload === 'even' ? getPadding(state) : action.payload;

      return {
        ...state,
        currentLength: getCurrentLength(state.movies, padding),
        settings: {
          ...state.settings,
          padding,
        },
      };
    }

    case timelineActionTypes.RESET:
      return {
        ...state,
        currentLength: 0,
        movies: [],
      };

    case timelineActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default timelineReducer;
