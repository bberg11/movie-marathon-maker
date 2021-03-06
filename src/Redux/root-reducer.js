import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import searchReducer from 'Redux/search/search.reducer';
import timelineReducer from 'Redux/timeline/timeline.reducer';
import flashReducer from 'Redux/flash/flash.reducer';
import tmdbReducer from 'Redux/tmdb/tmdb.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['timeline', 'tmdb'],
};

const reducers = combineReducers({
  search: searchReducer,
  timeline: timelineReducer,
  flash: flashReducer,
  tmdb: tmdbReducer,
});

export default persistReducer(persistConfig, reducers);
