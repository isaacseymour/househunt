import 'fetch';
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
  deleteHouse,
  updateHouseData,
  updateDestinationData,
} from './actions';

import { househuntApp } from './reducers';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import geocode from './services/geocode';

const store = createStore(househuntApp);
store.subscribe(() => console.log('store change', store.getState()));

class Househunt extends React.Component {
  addDestinationCallback(postcode) {
    const action = addDestination(postcode);
    this.props.dispatch(action);
    geocode(google, postcode).then((data) => {
      this.props.dispatch(updateDestinationData(action.id, data.lat(), data.lng()));
    });
  }

  deleteDestinationCallback(id) {
    this.props.dispatch(deleteDestination(id));
  }

  addHouseCallback(url) {
    const action = addHouse(url);
    this.props.dispatch(action);
    fetch('/crawl', {
      method: 'POST',
      body: JSON.stringify({ crawlUrl: url }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((r) => r.json())
    .then((response) => {
      console.log('add house response', response);
      if(response.error !== undefined) throw response;

      this.props.dispatch(updateHouseData(action.id, response.address));
    })
    .catch((error) => {
      console.log('add house error', error);
      // TODO: tell the user what's wrong somehow
      this.props.dispatch(deleteHouse(action.id));
    });
  }

  deleteHouseCallback(id) {
    this.props.dispatch(deleteHouse(id));
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
              deleteDestinationCallback={(id) => this.deleteDestinationCallback(id)}
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
            <ListHouses
              deleteHouseCallback={(id) => this.deleteHouseCallback(id)}
              houses={this.props.houses}
            />
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


