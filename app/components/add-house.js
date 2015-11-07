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
      <div className="row">
        <form className="col s12" onSubmit={(event) => this.submit(event)}>
          <div className="row">
            <div className="input-field col s12">
              <input type="text"
                     value={this.state.urlInput}
                     onChange={(event) => this.handleChange(event)} />
              <label>House URL</label>
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
