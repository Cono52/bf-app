import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import env from "./config";

const client = new ApolloClient({
  uri: `${env.apiGateway.URL}/graphql`
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
