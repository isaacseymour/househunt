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
      <div className="container">
        <div className="row">
          <div className="col s4">
            <h3>Add a destination</h3>
            <AddDestination
              addDestinationCallback={(postcode) => this.addDestinationCallback(postcode)}
            />
          </div>

          <div className="col s6 offset-s2">
            <ListDestinations
              deleteDestinationCallback={(uuid) => this.deleteDestinationCallback(uuid)}
              destinations={this.props.destinations}
            />
          </div>
        </div>

        <div className="divider"></div>

        <div className="row">
          <div className="col s4">
            <h3>Add a House</h3>
            <AddHouse addHouseCallback={(url) => this.addHouseCallback(url)} />
          </div>

          <div className="col s6 offset-s2">
            <ListHouses houses={this.props.houses} />
          </div>
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


