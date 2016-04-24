import React from 'react';
import ReactDOM from 'react-dom';
import Househunt from './components/househunt';
import { fromJS } from 'immutable';

import reducer from './reducers';

import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';

const store = compose(
  // save state in local storage between reloads
  persistState(null, {
    deserialize(storedState) {
      const result = JSON.parse(storedState);
      for(var key in result) {
        result[key] = fromJS(result[key]);
      }
      return result;
    },
  }),
  // Enable the thunk middleware
  applyMiddleware(thunkMiddleware),
  // Make redux dev tools work
  window && window.devToolsExtension ? window.devToolsExtension() : x => x
)(createStore)(reducer);

store.subscribe(() => console.log('store change', store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <Househunt />
  </Provider>,
  document.getElementById('app')
);


