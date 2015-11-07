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
      <div className="row">
        <form className="col s12" onSubmit={(event) => this.submit(event)}>
          <div className="row">
            <div className="input-field col s12">
              <input type="text"
                     value={this.state.urlInput}
                     onChange={(event) => this.handleChange(event)} />
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
