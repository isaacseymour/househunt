import React from 'react';
import ReactDOM from 'react-dom';
import Househunt from './components/househunt';

import reducer from './reducers';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider, connect } from 'react-redux';

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);
store.subscribe(() => console.log('store change', store.getState()));

const ConnectedHousehunt = connect((state) => state)(Househunt);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedHousehunt />
  </Provider>,
  document.getElementById('app')
);


