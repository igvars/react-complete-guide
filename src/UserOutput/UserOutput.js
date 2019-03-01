import React, { Component } from 'react';
import './UserOutput.css';

export default class UserOutput extends Component {
  render() {
    return (
      <div className="UserOutput">
        <p>Username: {this.props.username}</p>
        <p>Some text</p>
      </div>
    );
  }
}
