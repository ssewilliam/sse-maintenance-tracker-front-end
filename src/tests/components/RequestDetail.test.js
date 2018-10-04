import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RequestDetail from '../../components/Requests/RequestDetail/RequestDetail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><RequestDetail /></BrowserRouter> , div);
  ReactDOM.unmountComponentAtNode(div);
});
