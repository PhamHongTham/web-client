import React from 'react';
import { Switch, Route } from 'react-router-dom';

import '../stylesheets/styles.scss';
import Header from './shared/components/Header';
import Home from './pages/home/Home';
import Footer from './shared/components/Footer';
import UpdateInfo from './pages/updateInfo/UpdateInfo';
import ChangePassword from './pages/resetPassword/ChangePassword';
import Detail from './pages/detail/Detail';
import Wall from './pages/user/Wall';
import HandlePost from './pages/handlePost/HandlePost';

function App() {

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/user/update" component={UpdateInfo} />
        <Route path="/wall" component={Wall} />
        <Route path="/user/changepass" component={ChangePassword} />
        <Route path="/post/handle" exact component={HandlePost} />
        <Route path="/post/handle/:id" component={HandlePost} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
