import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reducers from 'Redux/root-reducer';
import { persistStore } from 'redux-persist';

const middlewares = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default store;
