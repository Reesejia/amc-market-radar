import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import history from '@/Router/history';
import { routerMiddleware } from 'connected-react-router';

let store;
if (process.env.NODE_ENV === 'development') {
  const reduxTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  store = applyMiddleware(promise, thunk, logger, routerMiddleware(history))(createStore)(reducers, reduxTools)
} else {
  store = applyMiddleware(promise, thunk, routerMiddleware(history))(createStore)(reducers)
}

export default store;


// import { createStore, applyMiddleware } from 'redux';
// import promise from 'redux-promise';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import reducers from './reducers';
// import history from '@/Router/history';
// import { routerMiddleware } from 'connected-react-router';

// let store = applyMiddleware(promise, thunk, logger, routerMiddleware(history))(createStore)(reducers)
// export default store;
