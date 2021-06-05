import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import { Login } from './сomponents/Login.jsx';
import { Footer } from './сomponents/Footer.jsx';
import { HomePage } from './сomponents/HomePage.jsx';
import { NotFoundPage } from './сomponents/NotFoundPage.jsx';
import { Header } from './сomponents/Header.jsx';
import { ProfilePage } from './сomponents/LoginPage/ProfilePage/ProfilePage';
import { getGroups  } from './api/getDates';

class App extends Component {
  state = {
    groups: null
  };

  async componentDidMount() {
    try {
      const groups = await getGroups();

      if (groups) {
        this.setState({
          groups: groups.map((group) => {
            const { id, name, number } = group;
            return { value: id, label: `${name}-${number}` };
          })
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { groups } = this.state;

    return (
      <HashRouter>
        <Header />

        <Switch>
          <Route path="/" exact>
            <HomePage groups={groups} />
          </Route>

          <Route path="/login">
            <Login groups={groups} />
          </Route>

          <Route path="/profile">
            <ProfilePage groups={groups} />
          </Route>

          <Route component={NotFoundPage} />
        </Switch>

        <Footer />
      </HashRouter>
    )
  }
}

export default App;