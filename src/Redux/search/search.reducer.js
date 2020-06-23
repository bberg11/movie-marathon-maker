import searchActionTypes from 'Redux/search/search.types';

export const INITIAL_STATE = {
  query: '',
  results: {},
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
  },
  showAutocomplete: false,
  activeResultItem: -1,
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

    case searchActionTypes.UPDATE_PAGINATION:
      return {
        ...state,
        pagination: {
          ...action.payload,
        },
      };
    case searchActionTypes.UPDATE_ACTIVE_RESULT_ITEM:
      return {
        ...state,
        activeResultItem: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
