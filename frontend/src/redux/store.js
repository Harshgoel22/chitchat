import rootReducer from './reducer';

const redux = require('redux');
const createStore = redux.legacy_createStore;
// const applyMiddleware = redux.applyMiddleware;
// const reduxLogger = require('redux-logger');
// const logger = reduxLogger.createLogger;

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
