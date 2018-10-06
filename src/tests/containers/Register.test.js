import React from 'react';
import { mount } from 'enzyme';
import { Alert } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../../containers/Register/Register';
import { notify } from 'react-notify-toast';

describe('Register without props', () => {
  let wrapper, parentWrapper, username, email, password;
  const event = { preventDefault: () => {} };

  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>);

    wrapper = parentWrapper.find(Register);
    jest.spyOn(event, 'preventDefault');

    username = wrapper.find('#registerUsername');
    email = wrapper.find('#registerEmail');
    password = wrapper.find('#registerPassword');
  });

  it('should render forms without breaking', () => {
    expect(wrapper.find('div')).toHaveLength(24);
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

  describe('registraction form submit',() => {
    let spyRegistrationEvent, spyValidationHandler;
    beforeEach(() =>{
      spyRegistrationEvent = jest.spyOn(wrapper.instance(), 'onRegistrationSubmitEventHandler');
      spyValidationHandler = jest.spyOn(wrapper.instance(), 'validationHandler');
    });

    it('should call onRegistrationSubmitEventHandler', async () => {
      wrapper.find('#registractionForm').simulate('submit');
      expect(spyRegistrationEvent).toHaveBeenCalled();
      expect(wrapper.instance().onRegistrationSubmitEventHandler).toHaveBeenCalled();
    });

    it('should call validationHandler 21 times', async () => {
      username.instance().value = 'sampleUser';
      username.simulate('change');
      email.instance().value = 'user@mail.com';
      email.simulate('change');
      password.instance().value = 'rightPassword';
      password.simulate('change');
      wrapper.find('#registractionForm').simulate('submit');
      expect(spyRegistrationEvent).toHaveBeenCalled();
      expect(spyValidationHandler).toHaveBeenCalled();
      expect(spyValidationHandler).toHaveBeenCalledTimes(21);
      expect(wrapper.instance().onRegistrationSubmitEventHandler).toHaveBeenCalled();
    });
  });
  describe('toggle',() => {
    it('should switch to tab 1', () =>{
      const tab1 = wrapper.find('NavLink').first();
      tab1.simulate('click');
      expect(wrapper.instance().state.activeTab).toBe('1');
    });
    it('should switch to tab 2',() => {
      const tab2 = wrapper.find('NavLink[name="tab2"]');
      tab2.simulate('click');
      expect(wrapper.instance().state.activeTab).toBe('2');
    });
    it('should switch to tab 3',() => {
      const tab3 = wrapper.find('NavLink[name="tab3"]');
      tab3.simulate('click');
      expect(wrapper.instance().state.activeTab).toBe('3');
    });
  });
});
describe('Register with props', () => {
  let wrapper, parentWrapper;
  const event = { preventDefault: () => {} };
  const props = {
    loginLoading: true,
    errorsLogin: {
      message: 'username already used',
    },
    loginStatus: true,
    promoStatus: true,
    errors: {
      message: 'username is already used',
    }
  };
  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <Register {...props} notifyDone={notify.show = jest.fn()}/>
      </BrowserRouter>);

    wrapper = parentWrapper.find(Register);
    jest.spyOn(event, 'preventDefault');
  });
  it('should render forms without breaking', () => {
    expect(wrapper.find('div')).toHaveLength(34);
  });
});
