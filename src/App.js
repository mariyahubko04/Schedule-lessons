import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Login } from './сomponents/LoginComponents/Login';
import { RegisterPage } from './сomponents/RegisterPage';
import { HomePage } from './сomponents/HomePage';
import { NotFoundPage } from './сomponents/NotFoundPage'
import { Header } from './сomponents/Header';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />

        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registration" component={RegisterPage} />
          <Route path="/home" component={HomePage} />

          <Route component={NotFoundPage} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;