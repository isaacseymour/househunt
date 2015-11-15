import React from 'react';

export default class House extends React.Component {
  onDeleteClick(event) {
    event.preventDefault();
    this.props.deleteHouseCallback(this.props.uuid);
  }

  render() {
    if(this.props.house.get('address')) {
      return (
        <div>
          {this.props.house.get('address')}
          <a href=""
             onClick={(event) => this.onDeleteClick(event)}
             className="secondary-content"><i className="material-icons">delete</i></a>
        </div>
      );
    } else {
      return (
        <div>Fetching property details...</div>
      );
    }
  }
}
