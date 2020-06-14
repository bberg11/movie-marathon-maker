import tmdbActionTypes from 'Redux/tmdb/tmdb.types';

export const INITIAL_STATE = {
  config: {},
};

const tmdbReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tmdbActionTypes.UPDATE_CONFIG:
      return {
        ...state,
        config: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default tmdbReducer;
