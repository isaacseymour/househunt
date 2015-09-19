import React from 'react';

export default class House extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.house.imageUrl) {
      // TODO: show the image
    } else {
      return (<div>Fetching property details...</div>);
    }
  }
}
