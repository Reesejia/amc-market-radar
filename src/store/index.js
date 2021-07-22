import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import history from '@/Router/history';
import { routerMiddleware } from 'connected-react-router';
import { TypeRootState } from './reducers';

let reduxTools =  process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null
let store = applyMiddleware(promise, thunk, logger, routerMiddleware(history))(createStore)(reducers, reduxTools)
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
