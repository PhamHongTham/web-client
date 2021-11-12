import React, { useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import 'stylesheets/styles.scss';

import Home from 'app/pages/home/Home';
import Header from 'share/component/header/Header';
import { fetchArticle } from 'app/stores/article/articleReducer';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticle());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
