import React from 'react';
import { connect } from 'react-redux';
import House from './house';

export class ListHouses extends React.Component {
  commutesForHouse(houseId) {
    return this.props.commutes.filter((_, key) => key.split('.')[0] === houseId);
  }

  renderHouses() {
    return this.props.houses.map((house, uuid) => {
      return (
        <li key={uuid} className="collection-item">
          <House house={house} uuid={uuid} commutes={this.commutesForHouse(uuid)} />
        </li>
      );
    }).toList();
  }

  render() {
    return (
      <div>
        <h3>Houses</h3>
        { this.props.houses.size > 0 &&
          <ul className="collection">{ this.renderHouses() }</ul>
        }
      </div>
    );
  }
}

export default connect(
  ({ commutes, houses }) => ({ commutes, houses })
)(ListHouses);
