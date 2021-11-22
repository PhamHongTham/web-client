import React, { useContext, useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../stylesheets/styles.scss';

import AuthRoute from './routes/AuthRoute';
import Header from './shared/components/Header';
import Home from './pages/home/Home';
import Footer from './shared/components/Footer';
import ChangePassword from './pages/resetPassword/ChangePassword';
import Detail from './pages/detail/Detail';
import Wall from './pages/wall/Wall';
import HandlePost from './pages/handlePost/HandlePost';
import UpdateInfo from './pages/updateInfo/UpdateInfo';
import { RootState } from './stores/app-reducer';
import { getUserInfoRequest } from './stores/user/actions';
import { LoadingContext } from './shared/components/loading/LoadingProvider';

function App() {
  const dispatch = useDispatch();
  const { handleShowLoading } = useContext(LoadingContext);
  const { isLoading } = useSelector((state: RootState) => state.userState);

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, []);

  useEffect(() => {
    handleShowLoading(isLoading ? true : false);
  }, [isLoading]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail/:id" exact component={Detail} />
        <AuthRoute
          path={['/post/new', '/post/edit/:id']}
          exact
          component={HandlePost}
        />
        <Route path="/wall" component={Wall} />
        <AuthRoute path="/user/update" component={UpdateInfo} />
        <AuthRoute path="/user/changepass" component={ChangePassword} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
