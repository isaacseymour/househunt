import React from 'react';
import AddDestination from './add-destination';
import ListDestinations from './list-destinations';
import AddHouse from './add-house';
import ListHouses from './list-houses';

import { addDestination, deleteDestination, addHouse, deleteHouse } from '../actions';

export default class Househunt extends React.Component {
  addDestinationCallback(postcode) {
    this.props.dispatch(addDestination(google, postcode));
  }

  deleteDestinationCallback(id) {
    this.props.dispatch(deleteDestination(id));
  }

  addHouseCallback(url) {
    this.props.dispatch(addHouse(url));
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
