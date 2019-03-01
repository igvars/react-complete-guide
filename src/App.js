import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    username: 'coolName',
  };

  usernameChangedHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <UserInput
            username={this.state.username}
            usernameChangedHandler={this.usernameChangedHandler}
        />
        <div>
            <UserOutput
                username={this.state.username}
            />
            <UserOutput
                username={this.state.username}
            />
        </div>
      </div>
    );
  }
}

export default App;
