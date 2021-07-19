import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import history from '@/Router/history';
import { routerMiddleware } from 'connected-react-router';
import { TypeRootState } from './reducers';
let store: Store<TypeRootState, AnyAction> = applyMiddleware(promise, thunk, logger, routerMiddleware(history))(createStore)(reducers)
export default store;
