import React from 'react';
import { connect } from 'react-redux';
import House from './house';

export class ListHouses extends React.Component {
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

export default connect(
  ({ houses }) => ({ houses })
)(ListHouses);
