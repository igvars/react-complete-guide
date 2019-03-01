import React, { Component } from 'react';

export default class UserInput extends Component {
  style = {
    border: '2px solid red',
  };

  render() {
    return (
      <div>
        <label>
          Username:
          <input
            style={this.style}
            type="text"
            value={this.props.username}
            onChange={this.props.usernameChangedHandler}
          />
        </label>
      </div>
    );
  }
}
