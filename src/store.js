import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from './middleware';
import user from './reducers/user';
import common from './reducers/common';
import posts from './reducers/posts';

const reducer = combineReducers({
    common,
    posts,
    user,
});

const enhancer = applyMiddleware(promiseMiddleware)

const store = createStore(reducer, {}, enhancer);

export default store;