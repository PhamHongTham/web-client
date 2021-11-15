import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/App';
import { store } from './app/stores/app-middleware';

import NotificationProvider from './app/shared/components/notifications/NotificationProvider'
import LoadingProvider from './app/shared/components/loading/LoadingProvider'

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <NotificationProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </NotificationProvider>
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
