import React from 'react';
import ReactDOM from 'react-dom';
import Househunt from './components/househunt';
import { fromJS } from 'immutable';

import reducer from './reducers';

import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';

const createPersistentStore = compose(persistState(null, {
  deserialize(storedState) {
    const result = JSON.parse(storedState);
    for(var key in result) {
      result[key] = fromJS(result[key]);
    }
    return result;
  },
}))(createStore);
const store = applyMiddleware(thunkMiddleware)(createPersistentStore)(reducer);
store.subscribe(() => console.log('store change', store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <Househunt />
  </Provider>,
  document.getElementById('app')
);


