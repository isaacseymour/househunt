import React from 'react';

export default class Destination extends React.Component {
  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteDestinationCallback(this.props.uuid);
  }

  render() {
    return (
      <div>
        { this.props.destination.get('postcode') }
        <a href="" onClick={(event) => this.onDeleteClick(event) }>Delete</a>
      </div>
    );
  }
}
