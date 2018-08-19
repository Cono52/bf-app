import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwtdecode from "jwt-decode";
import Feed from "./Feed";
import Admin from "./Admin";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  loginSuccess = () => {
    const userInfo = jwtdecode(localStorage.getItem("token"));
    this.setState({
      loggedIn: true,
      email: userInfo.email
    });
  };

  logout = () => {};

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            render={props => (
              <Feed
                {...props}
                loggedIn={this.loginSuccess}
                email={this.state.email}
              />
            )}
          />
          <Route path={`${process.env.PUBLIC_URL}/admin`} component={Admin} />
          <Route
            path={`${process.env.PUBLIC_URL}/login`}
            render={props => (
              <Login {...props} loginSuccess={this.loginSuccess} />
            )}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/register`}
            component={Register}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
