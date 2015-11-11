import React from 'react';

export default class Destination extends React.Component {
  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteDestinationCallback(this.props.uuid);
  }

  renderLatLng() {
    if (!this.props.destination.get('lat')) return null;

    return (
      <span>
        ({ this.props.destination.get('lat') }, { this.props.destination.get('lng') })
      </span>
    );
  }
  render() {
    return (
      <div>
        { this.props.destination.get('postcode') }
        { this.renderLatLng() }
        <a href=""
          onClick={(event) => this.onDeleteClick(event)}
          className="secondary-content"><i className="material-icons">delete</i></a>
      </div>
    );
  }
}
