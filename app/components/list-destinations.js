import React from 'react';
import Destination from './destination';

export default class ListDestinations extends React.Component {
  renderDestinations() {
    return this.props.destinations.map((destination, uuid) => {
      return (
        <li key={uuid} className="collection-item">
          <Destination
            deleteDestinationCallback={this.props.deleteDestinationCallback}
            destination={destination}
            uuid={uuid}
          />
        </li>
      );
    }).toList();
  }

  render() {
    return (
      <div>
        <h3>Destinations</h3>
        { this.props.destinations.size > 0 &&
          <ul className="collection">{this.renderDestinations()}</ul>
        }
      </div>
    );
  }
}
