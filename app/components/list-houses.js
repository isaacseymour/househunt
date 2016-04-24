import React from 'react';
import House from './house';

export default class ListHouses extends React.Component {
  commutesForHouse(houseId) {
    return this.props.commutes.filter((_, key) => key.split('.')[0] === houseId);
  }

  renderHouses() {
    return this.props.houses.map((house, uuid) => {
      return (
        <li key={uuid} className="collection-item">
          <House
            deleteHouseCallback={this.props.deleteHouseCallback}
            house={house}
            uuid={uuid}
            commutes={this.commutesForHouse(uuid)}
            destinations={this.props.destinations}
          />
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
