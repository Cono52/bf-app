import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Input } from './lib/components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2em;
`;

const RegisterForm = styled.form`
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  submit = (e) => {
    e.preventDefault();
    console.log('email: ', this.state.email);
    console.log('password: ', this.state.password);
    console.log('confirmPassword: ', this.state.confirmPassword);
    this.props.history.push('/');
  }

  render() {
    return (
      <Container>
        <h1>Register</h1>
        <RegisterForm onSubmit={this.submit}>
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
              type='password'
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
          <label htmlFor="confirm pasword">
            <p>Confirm Password</p>
            <Input
              type='password'
              value={this.state.confirmPassword}
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
          </label>
          <Button type="submit" >Submit</Button>
        </RegisterForm>
      </Container>
    );
  }
}

export default Register;
