import React, { Component } from 'react';
import AddDestination from './add-destination';
import ListDestinations from './list-destinations';
import AddHouse from './add-house';
import ListHouses from './list-houses';

export default class Househunt extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s4">
            <h3>Add a destination</h3>
            <AddDestination />
          </div>

          <div className="col s6 offset-s2">
            <ListDestinations />
          </div>
        </div>

        <div className="divider"></div>

        <div className="row">
          <div className="col s4">
            <h3>Add a House</h3>
            <AddHouse />
          </div>

          <div className="col s6 offset-s2">
            <ListHouses />
          </div>
        </div>
      </div>
    );
  }
}
