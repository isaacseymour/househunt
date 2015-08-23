import React from 'react';
import AddDestination from './add-destination';
import { addDestination } from './actions';
import { househuntApp } from './reducers';
import { createStore } from 'redux';

class Househunt extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(househuntApp);
    this.store.subscribe(() => console.log(this.store.getState().toJS()));
  }

  addDestinationCallback(postcode) {
    this.store.dispatch(addDestination(postcode));
  }

  render() {
    return (
      <AddDestination addDestinationCallback={(postcode) => this.addDestinationCallback(postcode) }/>
    );
  }
}

React.render(<Househunt />, document.getElementById('app'));
