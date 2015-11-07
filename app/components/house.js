import React from 'react';

export default class House extends React.Component {
  render() {
    if(this.props.house.get('address')) {
      return (
        <div>
          {this.props.house.get('address')}
        </div>
      );
    } else {
      return (
        <div>Fetching property details...</div>
      );
    }
  }
}
