import React from 'react';
import { mount } from 'enzyme';
import { Alert } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../../containers/Register/Register';

describe('Register', () => {
  let wrapper, parentWrapper, username, email, password;
  const event = { preventDefault: () => {} };

  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>);

    wrapper = parentWrapper.find(Register);
    jest.spyOn(event, 'preventDefault');

    username = wrapper.find('input[name="username"]');
    email = wrapper.find('input[name="email"]');
    password = wrapper.find('input[name="password"]');
  });

  it('should call eventListener', () => {
    const spy = jest.spyOn(wrapper.instance(), 'eventListener');
    wrapper.instance().forceUpdate();
    username.simulate('change', { target: { value: 'username', name: 'username' } });
    email.simulate('change', { target: { value: 'user@mail.com', name: 'email' } });
    password.simulate('change', { target: { value: 'password', name: 'password' } });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(3);
    expect(wrapper.instance().state.hasFocus.username).toBeTruthy();
    expect(wrapper.instance().state.hasFocus.email).toBeTruthy();
    expect(wrapper.instance().state.hasFocus.password).toBeTruthy();
  });

  describe('validationHandler', () => {
    beforeEach(() =>{
      username.instance().value = 'user';
      username.simulate('change');

      email.instance().value = 'email';
      email.simulate('change');

      password.instance().value = 'longerPassword';
      password.simulate('change');
    });

    it('should throw Alert when input value is wrong', () => {
      const validationInstanceUsername = wrapper.instance().validationHandler('username');
      const validationInstanceEmail = wrapper.instance().validationHandler('email');
      const validationInstanceGoodPassword = wrapper.instance().validationHandler('password');

      password.simulate('change', { target: { value: 'short', name: 'password' } });
      const validationInstanceBadPassword = wrapper.instance().validationHandler('password');

      expect(validationInstanceUsername).toBeTruthy();
      expect(validationInstanceEmail).toBeTruthy();
      expect(validationInstanceGoodPassword).toBeTruthy();
      expect(validationInstanceBadPassword).toBeTruthy();

      expect(validationInstanceUsername.type).toBe(Alert);
      expect(validationInstanceUsername.type).toBe(Alert);
      expect(validationInstanceUsername.type).toBe(Alert);
      expect(validationInstanceBadPassword.type).toBe(Alert);

      expect(validationInstanceBadPassword.props.children).toBe('Password needs to be at least 8 characters long.');
    });

    it('should return nothing when no errors occur', () => {
      const validationInstance = wrapper.instance().validationHandler('');
      expect(validationInstance).toBeFalsy();
    });
  });

  describe('onDismiss', () => {
    it('should change the \'visible\' state to false', () => {
      wrapper.instance().onDismiss();
      expect(wrapper.instance().state.visible).toBe(false);
    });
  });

  it('onregistrationsubmit', async () => {
    const spy = jest.spyOn(wrapper.instance(), 'onRegistrationSubmitEventHandler');
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().onRegistrationSubmitEventHandler).toHaveBeenCalled();
  });

  it('onregistrationsubmit34', async () => {
    const spy = jest.spyOn(wrapper.instance(), 'onRegistrationSubmitEventHandler');
    const spy3 = jest.spyOn(wrapper.instance(), 'validationHandler');
    username.instance().value = 'sampleUser';
    username.simulate('change');
    email.instance().value = 'user@mail.com';
    email.simulate('change');
    password.instance().value = 'rightPassword';
    password.simulate('change');
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalledTimes(9);
    expect(wrapper.instance().onRegistrationSubmitEventHandler).toHaveBeenCalled();
  });
});
