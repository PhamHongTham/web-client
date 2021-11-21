import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }: any) => {
  const token = localStorage.getItem('USER_TOKEN');

  return token ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};

export default AuthRoute;
