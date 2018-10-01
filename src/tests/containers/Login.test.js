import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../containers/Login/Login';

describe('Login', () => {
  let parentWrapper, wrapper;
  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <Login />
      </BrowserRouter>);
      wrapper = parentWrapper.find(Login);
    });
  it('renders without crashing', () => {
    const numDivs = wrapper.find('div')
    expect(numDivs.length).toBe(6);
  });
});