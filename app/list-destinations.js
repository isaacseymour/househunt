import React from 'react';

export default class ListDestinations extends React.Component {
  renderDestinations() {
    return this.props.destinations.map((destination, uuid) => {
      return <li key={uuid}>{ destination.get('postcode') }</li>;
    }).toList();
  }
  render() {
    return <ul>{ this.renderDestinations() }</ul>;
  }
}
