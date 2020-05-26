import { combineReducers } from 'redux';

import searchReducer from 'Redux/search/search.reducer';
import timelineReducer from 'Redux/timeline/timeline.reducer';

const reducers = combineReducers({
  search: searchReducer,
  timeline: timelineReducer,
});

export default reducers;
