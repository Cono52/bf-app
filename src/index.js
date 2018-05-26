import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Admin from './Admin';
import Login from './Login';
import Register from './Register';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
      <Route path={`${process.env.PUBLIC_URL}/admin`} component={Admin} />
      <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
      <Route path={`${process.env.PUBLIC_URL}/register`} component={Register} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
