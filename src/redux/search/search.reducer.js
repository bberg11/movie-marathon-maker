import searchActionTypes from 'Redux/search/search.types';

export const INITIAL_STATE = {
  results: {},
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchActionTypes.UPDATE_RESULTS:
      return {
        ...state,
        results: {
          ...state.results,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default searchReducer;
