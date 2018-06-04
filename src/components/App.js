import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import PasswordForgetPage, { PasswordForgetfrom } from './PasswordForget';
import Homepage from './Home';
import AccountPage from './Account';

import {firebase} from '../firebase';

import * as routes from '../constant/routes';
import withAuthentication from './withAuthentication';


const App = () =>
  <Router>
    <div>
    <Navigation/>
    <hr/>
    <Route
      exact path={routes.LANDING}
      component={() => <LandingPage />}
      />
      <Route
      exact path={routes.SIGN_UP}
      component={() => <SignUpPage />}
      />
      <Route
      exact path={routes.SIGN_IN}
      component={() => <SignInPage />}
      />
      <Route
      exact path={routes.PASSWORD_FORGET}
      component={() => <PasswordForgetPage />}
      />
      <Route
      exact path={routes.HOME}
      component={() => <Homepage />}
      />
      <Route
      exact path={routes.ACCOUNT}
      component={() => <AccountPage />}
      />
      </div>
  </Router>


export default withAuthentication(App);


