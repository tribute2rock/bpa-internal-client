import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './containers';
import Logout from './containers/Logout';

const AppRoutes = (props) => {
  return (
    <Switch>
      <Route path="/logout" name="Logout" render={(props) => <Logout {...props} />} />
      <Route path="/home" name="home" render={(props) => <Layout {...props} />} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
};

export default AppRoutes;
