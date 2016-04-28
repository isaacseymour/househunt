import React from 'react';
import { connect } from 'react-redux';
import { deleteDestination } from '../actions/destination';

export class Destination extends React.Component {
  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteDestination(this.props.uuid);
  }

  renderLatLng() {
    if (!this.props.destination.get('lat')) return null;

    return (
      <span>
        ({ this.props.destination.get('lat') }, { this.props.destination.get('lng') })
      </span>
    );
  }

  renderName() {
    if(this.props.destination.get('name')) {
      return `${this.props.destination.get('name')} (${this.props.destination.get('postcode')})`;
    } else {
      return this.props.destination.get('postcode');
    }
  }

  render() {
    return (
      <div>
        { this.renderName() }
        <a href=""
          onClick={(event) => this.onDeleteClick(event)}
          className="secondary-content"><i className="material-icons">delete</i></a>
      </div>
    );
  }
}

export default connect(null, { deleteDestination })(Destination);
