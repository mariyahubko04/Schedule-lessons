import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Login } from './сomponents/Login.jsx';
import { Footer } from './сomponents/Footer.jsx';
import { MainPageSlider } from './сomponents/MainPageSlider.jsx';
import { RegisterPage } from './сomponents/RegisterPage.jsx';
import { HomePage } from './сomponents/HomePage.jsx';
import { NotFoundPage } from './сomponents/NotFoundPage.jsx';
import { Header } from './сomponents/Header.jsx';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />

        <MainPageSlider />

        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registration" component={RegisterPage} />
          <Route path="/home" component={HomePage} />

          <Route component={NotFoundPage} />
        </Switch>

        <Footer />
      </HashRouter>
    )
  }
}

export default App;