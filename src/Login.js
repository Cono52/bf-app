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
  width: 250px;
  > * { margin-bottom: 1em; }
  margin: 1em;
  > label {
    width: 100%;
  }
  p {
    margin-left: 0.5em;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  background-color: #EE1C1C;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0.5em;
  color: white;
  width: 100%;
  flex-wrap: wrap;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      initialLoginMessage: this.props.location.search === '?registered=true'
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
        { this.state.initialLoginMessage && <div>Registration Successful!</div> }
        <LoginForm onSubmit={this.submit}>
          <label htmlFor="email">
            <p>Email</p>
            <Input
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </label>
          { this.state.error === 'User not found' && <ErrorMessage>We dont have an account with this email!</ErrorMessage> }
          <label htmlFor="pasword">
            <p>Password</p>
            <Input
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
          { this.state.error === 'Wrong Password' && <ErrorMessage>Incorrect password!</ErrorMessage> }
          <Button type="submit">Log In</Button>
          <Link to={`${process.env.PUBLIC_URL}/register`}>Create an account.</Link>
        </LoginForm>
      </Container>
    );
  }
}

export default Login;
