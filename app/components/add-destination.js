import React from 'react';
import { connect } from 'react-redux';
import { addDestination } from '../actions/destination';

export class AddDestination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postcodeInput: '', nameInput: '' };
  }

  handleChange(event) {
    this.setState({ postcodeInput: event.target.value });
  }

  submit(event) {
    event.preventDefault();
    this.props.addDestination(this.state.postcodeInput, this.state.nameInput);
    this.setState({ postcodeInput: '', nameInput: '' });
  }

  render() {
    const handleChange = (event) => this.setState({ [event.target.name]: event.target.value });

    return (
      <div className="row">
        <form className="col s12" onSubmit={(event) => this.submit(event)}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="nameInput"
                value={this.state.nameInput}
                onChange={handleChange} />
              <label>Name</label>
            </div>
            <div className="input-field col s12">
              <input
                type="text"
                name="postcodeInput"
                value={this.state.postcodeInput}
                onChange={handleChange} />
              <label>Postcode</label>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addDestination })(AddDestination);
