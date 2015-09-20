import React from 'react';
import House from './house';

export default class ListHouses extends React.Component {
  renderHouses() {
    return this.props.houses.map((house, uuid) => {
      return (
        <li key={uuid}>
          <House house={house} uuid={uuid} />
        </li>
      );
    }).toList();
  }

  render() {
    return (<ul>{this.renderHouses()}</ul>);
  }
}
