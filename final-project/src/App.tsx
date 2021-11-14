import React from 'react';

import { Route, Switch } from 'react-router-dom';

import 'stylesheets/styles.scss';

import Home from 'app/pages/home/Home';
import Header from 'share/component/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
