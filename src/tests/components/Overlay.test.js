import React from 'react';
import ReactDOM from 'react-dom';
import Overlay from '../../components/Overlay/Overlay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Overlay /> , div);
  ReactDOM.unmountComponentAtNode(div);
});
