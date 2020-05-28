import searchActionTypes from 'Redux/search/search.types';

export const INITIAL_STATE = {
  query: '',
  results: {},
  showAutocomplete: false,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchActionTypes.UPDATE_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    case searchActionTypes.UPDATE_RESULT:
      return {
        ...state,
        results: {
          ...state.results,
          ...action.payload,
        },
      };
    case searchActionTypes.TOGGLE_AUTOCOMPLETE:
      return {
        ...state,
        showAutocomplete: action.payload,
      };
    case searchActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
