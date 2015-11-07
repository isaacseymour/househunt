import React from 'react';
import House from './house';

export default class ListHouses extends React.Component {
  renderHouses() {
    return this.props.houses.map((house, uuid) => {
      return (
        <li key={uuid} className="collection-item">
          <House house={house} uuid={uuid} />
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
