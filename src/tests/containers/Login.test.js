import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Register } from '../../containers/Register/Register';

describe('Register', () => {
  let wrapper, parentWrapper, loginUsername, loginPassword;
  const event = { preventDefault: () => {} };

  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>);

    wrapper = parentWrapper.find(Register);
    jest.spyOn(event, 'preventDefault');

    loginUsername = wrapper.find('#username');
    loginPassword = wrapper.find('#password');
  });
  describe('validationHandler', () => {
    beforeEach(() =>{
      loginUsername.instance().value = '';
      loginUsername.simulate('change');

      loginPassword.instance().value = '';
      loginPassword.simulate('change');
    });
    it('should throw Alert when input value is wrong', () => {
      const validationInstanceUsername = wrapper.instance().validationHandler('loginUsername');
      const validationInstancePassword = wrapper.instance().validationHandler('loginPassword');

      expect(validationInstanceUsername).toBeTruthy();
      expect(validationInstancePassword).toBeTruthy();

      expect(validationInstanceUsername.type).toBe(Alert);
      expect(validationInstancePassword.type).toBe(Alert);

      expect(validationInstancePassword.props.children).toBe('A Password is required to login');
    });
  });
  describe('login form submit',() => {
    let spyLoginEvent, spyValidationHandler;
    beforeEach(() =>{
      spyLoginEvent = jest.spyOn(wrapper.instance(), 'onLoginSubmitEventHandler');
      spyValidationHandler = jest.spyOn(wrapper.instance(), 'validationHandler');
    });

    it('should call onLoginSubmitEventHandler', async () => {
      wrapper.find('#loginForm').simulate('submit');
      expect(spyLoginEvent).toHaveBeenCalled();
      expect(wrapper.instance().onLoginSubmitEventHandler).toHaveBeenCalled();
    });

    it('should call validationHandler 15 times', async () => {
      loginUsername.instance().value = 'sampleUser';
      loginUsername.simulate('change');
      loginPassword.instance().value = 'rightPassword';
      loginPassword.simulate('change');
      wrapper.find('#loginForm').simulate('submit');
      expect(spyLoginEvent).toHaveBeenCalled();
      expect(spyValidationHandler).toHaveBeenCalled();
      expect(spyValidationHandler).toHaveBeenCalledTimes(10);
      expect(wrapper.instance().onLoginSubmitEventHandler).toHaveBeenCalled();
    });
  });
});
