import React from 'react';
import { Map } from 'immutable';

import { connect } from 'react-redux';
import { deleteHouse } from '../actions/house';

const MAX_WALK = 25 * 60;

function secondsToMinutes(seconds) {
  return Math.round(seconds / 60);
}

function showCommute({ WALKING, BICYCLING, TRANSIT }) {
  if(WALKING < MAX_WALK) {
    return `${secondsToMinutes(WALKING)} mins 🚶`;
  } else {
    return `${secondsToMinutes(TRANSIT)} mins 🚌 ` +
      `(or ${secondsToMinutes(WALKING)}m 🚶, ${secondsToMinutes(BICYCLING)}m 🚲)`;
  }
}

export class House extends React.Component {
  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteHouse(this.props.uuid);
  }

  renderCommutes() {
    return this.props.house.get("commutes", new Map())
      .map(this.renderCommute.bind(this))
      .valueSeq();
  }

  renderCommute(commute, destinationId) {
    const destination = this.props.destinations.get(destinationId);

    return (
      <li key={destinationId}>
        {showCommute(commute.toObject())} to {destination.get('name') || destination.get('postcode')}
      </li>
    );
  }

  render() {
    if(this.props.house.get('address')) {
      return (
        <div>
          <a href={this.props.house.get('url')}>{this.props.house.get('address')}</a>
          <a href=""
             onClick={(event) => this.onDeleteClick(event)}
             className="secondary-content"><i className="material-icons">delete</i></a>
           <ul>
             { this.renderCommutes() }
            </ul>
        </div>
      );
    } else {
      return (
        <div>Fetching property details...</div>
      );
    }
  }
}

export default connect(
  ({ destinations }) => ({ destinations }),
  { deleteHouse }
)(House);
