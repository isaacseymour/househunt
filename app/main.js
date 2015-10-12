import React from 'react';
import ReactDOM from 'react-dom';
import AddDestination from './components/add-destination';
import ListDestinations from './components/list-destinations';
import AddHouse from './components/add-house';
import ListHouses from './components/list-houses';
import {
  addDestination,
  deleteDestination,
  addHouse,
} from './actions';
import { househuntApp } from './reducers';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const store = createStore(househuntApp);
store.subscribe(() => console.log('store change', store.getState()));

class Househunt extends React.Component {
  addDestinationCallback(postcode) {
    this.props.dispatch(addDestination(postcode));
  }

  deleteDestinationCallback(uuid) {
    this.props.dispatch(deleteDestination(uuid));
  }

  addHouseCallback(url) {
    this.props.dispatch(addHouse(url));
  }

  render() {
    return (
      <div>
        <div>
          <AddDestination
            addDestinationCallback={(postcode) => this.addDestinationCallback(postcode)}
          />

        <ListDestinations
          deleteDestinationCallback={(uuid) => this.deleteDestinationCallback(uuid)}
          destinations={this.props.destinations}
        />
      </div>

      <div>
        <AddHouse addHouseCallback={(url) => this.addHouseCallback(url)} />

        <ListHouses houses={this.props.houses} />
      </div>
    </div>
    );
  }
}

const ConnectedHousehunt = connect((state) => state)(Househunt);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedHousehunt />
  </Provider>,
  document.getElementById('app')
);


