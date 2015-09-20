import React from 'react';

export default class AddHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { urlInput: '' };
  }

  handleChange(event) {
    this.setState({ urlInput: event.target.value });
  }

  submit(event) {
    event.preventDefault();
    this.props.addHouseCallback(this.state.urlInput);
  }

  render() {
    return (
      <form onSubmit={(event) => this.submit(event)}>
        <label>House URL:</label>
        <input type="text"
               value={this.state.urlInput}
               onChange={(event) => this.handleChange(event)} />
        <button type="submit">Add</button>
      </form>
    );
  }
}
