import { combineReducers } from 'redux';

import searchReducer from 'Redux/search/search.reducer';

const reducers = combineReducers({
  search: searchReducer,
});

export default reducers;
