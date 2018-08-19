import React, { Component } from "react";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";
import axios from "axios";
import { Button, Input } from "./lib/components";
import isValidEmail from "./lib/helpers/isValidEmail";
import env from "./config";
import theme from "./lib/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2em;
`;

const RegisterForm = styled.form`
  font-family: Helvetica, sans-serif;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  width: 250px;
  > * {
    margin-bottom: 1em;
  }
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
    color: ${theme.colors.lightPurple};
    padding-right: 0.3em;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  background-color: ${theme.colors.redError};
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
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  submit = e => {
    const { email, password, confirmPassword } = this.state;
    e.preventDefault();
    this.setState({
      error: undefined,
      emailError: undefined,
      passwordError: undefined
    });
    if (email === "") {
      this.setState({ emailError: "Please enter an email" });
      return;
    }
    if (!isValidEmail(email)) {
      this.setState({ emailError: "Invalid Email!" });
      return;
    }
    if (password === "") {
      this.setState({ passwordError: "Please enter password" });
      return;
    }
    if (password === confirmPassword) {
      this.setState({ passwordsDontMatch: false });
      axios
        .post(`${env.apiGateway.URL}/user/register`, { email, password })
        .then(() => {
          this.props.history.push(
            `${process.env.PUBLIC_URL}/login?registered=true`
          );
        })
        .catch(error => {
          if (error.response.data.message) {
            this.setState({ error: error.response.data.message });
          } else {
            this.setState({ error: "Something went wrong!" });
          }
        });
    } else if (password !== confirmPassword) {
      this.setState({ passwordsDontMatch: true });
    }
  };

  render() {
    const {
      error,
      email,
      emailError,
      passwordError,
      password,
      confirmPassword,
      passwordsDontMatch
    } = this.state;
    return (
      <Container>
        <h1>Register</h1>
        <RegisterForm onSubmit={this.submit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <label htmlFor="email">
            <InputLabel>
              <p>Email</p>
              {emailError && (
                <p>
                  <FontAwesome name="exclamation-triangle" />
                  {emailError}
                </p>
              )}
            </InputLabel>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </label>
          <label htmlFor="password">
            <InputLabel>
              <p>Password</p>
              {passwordError && (
                <p>
                  <FontAwesome name="exclamation-triangle" />
                  {passwordError}
                </p>
              )}
            </InputLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
          <label htmlFor="confirmPassword">
            <InputLabel>
              <p>Confirm Password</p>
            </InputLabel>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
          </label>
          {passwordsDontMatch && (
            <ErrorMessage>Passwords do not match.</ErrorMessage>
          )}
          <Button type="submit">Submit</Button>
        </RegisterForm>
      </Container>
    );
  }
}

export default Register;
