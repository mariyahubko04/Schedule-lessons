import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Login } from './сomponents/Login.jsx';
import { Footer } from './сomponents/Footer.jsx';
import { HomePage } from './сomponents/HomePage.jsx';
import { NotFoundPage } from './сomponents/NotFoundPage.jsx';
import { Header } from './сomponents/Header.jsx';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />

          <Route component={NotFoundPage} />
        </Switch>

        <Footer />
      </HashRouter>
    )
  }
}

export default App;