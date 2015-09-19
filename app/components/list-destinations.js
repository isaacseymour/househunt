import React from 'react';
import Destination from './destination';

export default class ListDestinations extends React.Component {
  renderDestinations() {
    return this.props.destinations.map((destination, uuid) => {
      return (
        <li key={uuid}>
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
    return (<ul>{this.renderDestinations()}</ul>);
  }
}
