import React from 'react';

export default class AddDestination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postcodeInput: '' };
  }

  handleChange(event) {
    this.setState({ postcodeInput: event.target.value });
  }

  submit(event) {
    event.preventDefault();
    this.props.addDestinationCallback(this.state.postcodeInput);
  }

  render() {
    return (
      <form onSubmit={(event) => this.submit(event) }>
        <label>Postcode</label>
        <input type="text"
               value={this.state.postcodeInput}
               onChange={(event) => this.handleChange(event) } />
        <button type="submit">Add</button>
      </form>
    );
  }
}
