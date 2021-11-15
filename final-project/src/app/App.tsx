import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../stylesheets/styles.scss';
import Header from './shared/components/Header';
import Home from './pages/home/Home';
import Footer from './shared/components/Footer';
import UpdateInfo from './pages/updateInfo/UpdateInfo';
import ChangePassword from './pages/resetPassword/ChangePassword';
import { useSelector } from 'react-redux';
import { RootState } from './stores/app-reducer';

function App() {

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/update" component={UpdateInfo} />
        <Route path="/user/changepass" component={ChangePassword} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
