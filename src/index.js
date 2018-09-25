import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import Store from './store/reducers/index';

ReactDOM.render(
  <Provider store={Store}>
    <Routes />
  </Provider>, 
  document.getElementById('root'));
