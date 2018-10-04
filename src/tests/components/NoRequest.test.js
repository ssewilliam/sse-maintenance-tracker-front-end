import React from 'react';
import ReactDOM from 'react-dom';
import NoRequest from '../../components/Requests/NoRequest/NoRequest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <NoRequest /> , div);
  ReactDOM.unmountComponentAtNode(div);
});
