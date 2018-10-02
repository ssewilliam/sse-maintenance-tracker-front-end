import React from 'react';
import { mount } from 'enzyme';
import Home from '../../containers/Home/Home';

it('should logout users', () => {
  const wrapper = mount(<Home history={{push: jest.fn()}} />);
  wrapper.instance().signOut();
  const username = localStorage.getItem('username');
  expect(username).toBe(false);
});
