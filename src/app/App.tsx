import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../stylesheets/styles.scss';

import Header from './shared/components/Header';
import Home from './pages/home/Home';
import Footer from './shared/components/Footer';
import ChangePassword from './pages/resetPassword/ChangePassword';
import Detail from './pages/detail/Detail';
import Wall from './pages/user/Wall';
import HandlePost from './pages/handlePost/HandlePost';
import { getUserInfoRequest } from './stores/user/actions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/post/handle" exact component={HandlePost} />
        <Route path="/post/handle/:id" exact component={HandlePost} />
        <Route path="/wall" component={Wall} />
        <Route path="/user/changepass" component={ChangePassword} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
