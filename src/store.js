import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import usersReducer from './reducers/users';
import sheduleReducer from './reducers/shedule';

const loggerMiddleware = createLogger({
  predicate: (_, action) =>
      action.type !== '',
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  users: usersReducer,
  shedule: sheduleReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, loggerMiddleware)));

export default store;