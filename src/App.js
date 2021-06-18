import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { Login } from './сomponents/Login.jsx';
import { Footer } from './сomponents/Footer.jsx';
import { HomePage } from './сomponents/HomePage.jsx';
import { NotFoundPage } from './сomponents/NotFoundPage.jsx';
import { Header } from './сomponents/Header.jsx';
import { ProfilePage } from './сomponents/LoginPage/ProfilePage/ProfilePage';
import { getGroups, getAllAcademicStatus, getAllLessonTypes  } from './actions/shedule';

class App extends Component {
  state = {
    groups: null,
    academicStatus: [],
    isLogin: false,
    typeLessons: [],
  };

  async componentDidMount() {
    try {
      const groups = await this.props.getGroups();
      const academicStatus = await this.props.getAllAcademicStatus();
      const typeLessons = await this.props.getAllLessonTypes();

      if (groups) {
        this.setState({
          groups: (groups || []).map((group) => {
            const { id, name, number } = group;
            return { value: id, label: `${name}-${number}` };
          }),
          academicStatus: (academicStatus  || []).map((group) => {
            const { id, name } = group;
            return { value: id, label: name };
          }),
          typeLessons:  typeLessons,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  setLogin = isLogin => {
    this.setState({ isLogin });
  };

  render() {
    const { groups, academicStatus, typeLessons, isLogin } = this.state;
    const user = sessionStorage.getItem('user');
    const { role } = user ? JSON.parse(user) : { role: null };

    return (
      <HashRouter>
        <Header isLogin={isLogin} setLoginStatus={this.setLogin}/>

        <Switch>
          <Route path="/" exact>
            <HomePage groups={groups} />
          </Route>

          <Route path="/login">
            <Login groups={groups} setLogin={this.setLogin}/>
          </Route>

          {role && <Route path="/profile">
            <ProfilePage groups={groups} academicStatus={academicStatus} typeLessons={typeLessons} isLogin={isLogin} />
          </Route>}

          <Route component={NotFoundPage} />
        </Switch>

        <Footer />
      </HashRouter>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getGroups: () => dispatch(getGroups()),
  getAllAcademicStatus: () => dispatch(getAllAcademicStatus()),
  getAllLessonTypes: () => dispatch(getAllLessonTypes())
});

export default connect(null, mapDispatchToProps)(App);