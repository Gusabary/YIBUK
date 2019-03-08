import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from './middleware';
import user from './reducers/user';
import common from './reducers/common';
import books from './reducers/books';

const reducer = combineReducers({
    common,
    books,
    user,
});

const enhancer = applyMiddleware(promiseMiddleware)

const store = createStore(reducer, {}, enhancer);

export default store;