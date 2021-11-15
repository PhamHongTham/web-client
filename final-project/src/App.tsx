import React from 'react';

import 'stylesheets/styles.scss';

import { Route, Switch } from 'react-router-dom';

import Home from 'app/pages/home/Home';
import Header from 'share/component/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}
export default App;
