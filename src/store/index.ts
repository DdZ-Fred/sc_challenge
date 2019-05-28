import { createStore, Store, compose, applyMiddleware } from 'redux';
import rootReducer, { ScStoreActions, ScStoreState } from './rootReducer';
import { actionCreators as globalActionCreators } from './global';
import { EnhancedWindow } from '../types';
import middlewares from './middlewares';


export type ScStore = Store<ScStoreState, ScStoreActions>;

const win = window as EnhancedWindow;

let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development' && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

// STORE INIT ACTION
store.dispatch(globalActionCreators.initStore());

export default store;