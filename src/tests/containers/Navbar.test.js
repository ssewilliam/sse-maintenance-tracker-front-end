import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Navbar /></BrowserRouter> , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should logout users', () => {
  const wrapper = shallow(<Navbar/>);
  wrapper.find('.nav_bar.float-right a').simulate('click');
  const username = localStorage.getItem('username');
  expect(username).toBe(false);
});