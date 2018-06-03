import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Input } from './lib/components';
import env from './config';

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
    if (this.state.password !== '' && this.state.email !== '' && this.state.password === this.state.confirmPassword) {
      this.setState({ passwordsDontMatch: false });
      axios.post(`${env.apiGateway.URL}/register`, {
        email: this.state.email,
        password: this.state.password
      })
        .then(() => {
          this.props.history.push(`${process.env.PUBLIC_URL}/login?registered=true`);
        })
        .catch((error) => {
          if (error.response.data.message) {
            this.setState({ error: error.response.data.message });
          } else {
            this.setState({ error: 'Something went wrong!' });
          }
        });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordsDontMatch: true });
    }
  }

  render() {
    return (
      <Container>
        <h1>Register</h1>
        <RegisterForm onSubmit={this.submit}>
          { this.state.error && <ErrorMessage>{ this.state.error }</ErrorMessage>}
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
          <label htmlFor="confirm pasword">
            <p>Confirm Password</p>
            <Input
              type="password"
              value={this.state.confirmPassword}
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
          </label>
          { this.state.passwordsDontMatch && <ErrorMessage>Passwords do not match.</ErrorMessage>}
          <Button type="submit" >Submit</Button>
        </RegisterForm>
      </Container>
    );
  }
}

export default Register;
