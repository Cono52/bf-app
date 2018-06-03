import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
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
  font-family: Helvetica, sans-serif;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  width: 250px;
  > * { margin-bottom: 1em; }
  margin: 1em;
  > label {
    width: 100%;
  }
`;

const InputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2em;
  > :first-child {
    padding-left: 0.5em;
  }
  > p > span {
    color: var(--main-purple);
    padding-right: 0.3em;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  background-color: var(--red-error);
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
    this.setState({ error: undefined, emailError: undefined, passwordError: undefined });
    if (this.state.email === '') {
      this.setState({ emailError: 'Please enter an email' });
      return;
    }
    if (this.state.password === '') {
      this.setState({ passwordError: 'Please enter password' });
      return;
    }
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
            <InputLabel>
              <p>Email</p>
              { this.state.emailError &&
                <p>
                  <FontAwesome
                    name="exclamation-triangle"
                  />{this.state.emailError}
                </p>
              }
            </InputLabel>
            <Input
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </label>
          { this.state.error === 'User not found' && <ErrorMessage>We dont have an account with this email!</ErrorMessage> }
          <label htmlFor="pasword">
            <InputLabel>
              <p>Password</p>
              { this.state.passwordError &&
                <p>
                  <FontAwesome
                    name="exclamation-triangle"
                  />{ this.state.passwordError }
                </p>
              }
            </InputLabel>
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
