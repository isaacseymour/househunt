import React from 'react';

export default class House extends React.Component {
  render() {
    if(this.props.house.get('imageUrl')) {
      return (
        <div>
          <h3>{this.props.house.get('address')}</h3>
          <img src={this.props.house.get('imageUrl')} />
        </div>
      );
    } else {
      return (<div>Fetching property details...</div>);
    }
  }
}
