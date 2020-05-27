import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import searchReducer from 'Redux/search/search.reducer';
import timelineReducer from 'Redux/timeline/timeline.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['timeline'],
};

const reducers = combineReducers({
  search: searchReducer,
  timeline: timelineReducer,
});

export default persistReducer(persistConfig, reducers);
