import React from 'react';

import { connect } from 'react-redux';
import { deleteHouse } from '../actions/house';

export class House extends React.Component {
  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteHouse(this.props.uuid);
  }

  renderCommute(commute, id) {
    const destinationId = id.split('.')[1];
    const destination = this.props.destinations.get(destinationId);

    const formatTime = (seconds) => `${Math.round(seconds / 60)} mins`;

    return (
      <li key={id}>
        To {destination.get("postcode")}:<br />
        🚶: {formatTime(commute.get("WALKING"))}<br />
        🚲: {formatTime(commute.get("BICYCLING"))}<br />
        🚌: {formatTime(commute.get("TRANSIT"))}<br />
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
             {this.props.commutes.map((commute, id) => this.renderCommute(commute, id)).valueSeq()}
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
