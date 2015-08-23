import React from 'react';
import AddDestination from './add-destination';
import { addDestination } from './actions';
import { househuntApp } from './reducers';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import ListDestinations from './list-destinations';

const store = createStore(househuntApp);
store.subscribe(() => console.log('store change', store.getState()));

class Househunt extends React.Component {
  addDestinationCallback(postcode) {
    this.props.dispatch(addDestination(postcode));
  }

  render() {
    console.log('househunt got props', this.props);
    return (
      <div>
        <AddDestination addDestinationCallback={(postcode) => this.addDestinationCallback(postcode) }/>
        <ListDestinations destinations={this.props.destinations} />
      </div>
    );
  }
}

const ConnectedHousehunt = connect((state) => state)(Househunt);

React.render(
  <Provider store={store}>
    {() => <ConnectedHousehunt />}
  </Provider>,
  document.getElementById('app')
);


