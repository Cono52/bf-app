import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Input } from './lib/components';

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
    console.log('email: ', this.state.email);
    console.log('password: ', this.state.password);
    this.props.history.push('/');
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
          <label htmlFor="pasword">
            <p>Password</p>
            <Input
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
          <Button type="submit">Log In</Button>
          <Link to="/register">Create an account.</Link>
        </LoginForm>
      </Container>
    );
  }
}

export default Login;
