import timelineActionTypes from 'Redux/timeline/timeline.types';

export const INITIAL_STATE = {
  settings: {
    lengthMode: 'time',
    length: 60,
    padding: 0,
    startDateTime: new Date(),
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
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  if (padding > 0 && totalRuntime > 0) {
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

const updateStartFinishTimes = (movies, padding) => {
  let progress = 0;

  return movies.map((movie, index) => {
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
      const {
        movies,
        settings: { padding },
      } = state;

      return {
        ...state,
        movies: updateStartFinishTimes(movies, padding),
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

    case timelineActionTypes.UPDATE_SETTINGS: {
      const { movies } = state;
      const { padding } = action.payload;

      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
        currentLength: getCurrentLength(movies, padding),
        movies: updateStartFinishTimes(movies, padding),
      };
    }

    default:
      return state;
  }
};

export default timelineReducer;
