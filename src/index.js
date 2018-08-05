import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import "./index.css";
import App from "./App";
import Admin from "./Admin";
import Login from "./Login";
import Register from "./Register";
import registerServiceWorker from "./registerServiceWorker";
import env from "./config";

const client = new ApolloClient({
  uri: `${env.apiGateway.URL}/graphql`
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
        <Route path={`${process.env.PUBLIC_URL}/admin`} component={Admin} />
        <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
        <Route
          path={`${process.env.PUBLIC_URL}/register`}
          component={Register}
        />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
