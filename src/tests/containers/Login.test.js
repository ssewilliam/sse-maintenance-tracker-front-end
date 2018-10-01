import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../containers/Login/Login';

describe('Login', () => {
  let wrapper, parentWrapper, username, password;
  const event = { preventDefault: () => {} };

  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <Login />
      </BrowserRouter>);

    wrapper = parentWrapper.find(Login);
    jest.spyOn(event, 'preventDefault');

    username = wrapper.find('input[name="username"]');
    password = wrapper.find('input[name="password"]');
  });
  
  describe('onDismiss', () => {
    it('should change the \'visible\' state to false', () => {
      wrapper.instance().onDismiss();
      expect(wrapper.instance().state.visible).toBe(false);
    });
  });

  it('renders without crashing', () => {
    const numDivs = wrapper.find('div');
    expect(numDivs).toHaveLength(6);
  });

  it('should call eventListener', () => {
    const spy = jest.spyOn(wrapper.instance(), 'eventListener');
    wrapper.instance().forceUpdate();
    username.simulate('change', { target: { value: 'username', name: 'username' } });
    password.simulate('change', { target: { value: 'password', name: 'password' } });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(wrapper.instance().state.hasFocus.username).toBeTruthy();
    expect(wrapper.instance().state.hasFocus.password).toBeTruthy();
  });

  it('should call onLoginSubmitEventHandler on form submitted', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onLoginSubmitEventHandler');
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().onLoginSubmitEventHandler).toHaveBeenCalled();
  });

  it('should set state', () => {
    wrapper.instance().handleResponse('settedState', false);
    expect(wrapper.instance().state.settedState).toBe(false);
  });

  it('should set localstorage', () => {
    wrapper.instance().handleLocalStorage('username', 'ssewilliam');
    const username = localStorage.getItem('username');
    expect(username).toBe('ssewilliam');
  });
});