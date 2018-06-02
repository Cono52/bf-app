import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Input } from './lib/components';

import env from './config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2em;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: fit-content;
  > * { margin-bottom: 1em; }
  margin: 1em;
  > label {
    width: fit-content;
  }
  p {
    margin-left: 0.5em;
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  submit = (e) => {
    e.preventDefault();
    axios.post(`${env.apiGateway.URL}/login`, {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        this.setState({ error: error.response.data.message });
      });
    // this.props.history.push(`${process.env.PUBLIC_URL}/`);
  }

  render() {
    return (
      <Container>
        <h1>Login</h1>
        <LoginForm onSubmit={this.submit}>
          <label htmlFor="email">
            <p>Email</p>
            <Input
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </label>
          { this.state.error === 'User not found' && <div>We dont have an account with this email</div> }
          <label htmlFor="pasword">
            <p>Password</p>
            <Input
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
          { this.state.error === 'Wrong Password' && <div>We dont have an account with this email</div> }
          <Button type="submit">Log In</Button>
          <Link to={`${process.env.PUBLIC_URL}/register`}>Create an account.</Link>
        </LoginForm>
      </Container>
    );
  }
}

export default Login;
