import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../stylesheets/styles.scss';

import AuthRoute from './routes/AuthRoute';
import Header from './shared/components/Header';
import Home from './pages/home/Home';
import ChangePassword from './pages/resetPassword/ChangePassword';
import Detail from './pages/detail/Detail';
import Wall from './pages/wall/Wall';
import HandlePost from './pages/handlePost/HandlePost';
import UpdateInfo from './pages/updateInfo/UpdateInfo';
import { getUserInfoRequest } from './stores/user/actions';
import NotFound from './pages/notFound/NotFound';
import { localStorageOption } from 'app/shared/helper/LocalAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorageOption.getUserToken) {
      dispatch(getUserInfoRequest());
    }
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail/:id" exact component={Detail} />
        <AuthRoute path={['/post/new', '/post/edit/:id']} exact component={HandlePost} />
        <AuthRoute path="/wall/:id" exact component={Wall} />
        <AuthRoute path="/user/update" component={UpdateInfo} />
        <AuthRoute path="/user/changepass" component={ChangePassword} />
        <Route path="*" exact={true} component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
