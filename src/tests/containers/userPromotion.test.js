import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Register } from '../../containers/Register/Register';

describe('Register', () => {
  let wrapper, parentWrapper, promoUsername, promoEmail;
  const event = { preventDefault: () => {} };

  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>);

    wrapper = parentWrapper.find(Register);
    jest.spyOn(event, 'preventDefault');

    promoUsername = wrapper.find('#promoUsername');
    promoEmail = wrapper.find('#promoEmail');
  });
  describe('validationHandler', () => {
    beforeEach(() =>{
      promoUsername.instance().value = '';
      promoUsername.simulate('change');

      promoEmail.instance().value = '';
      promoEmail.simulate('change');
    });
    it('should throw Alert when input value is wrong', () => {
      const validationInstancePromoUsername = wrapper.instance().validationHandler('promoUsername');
      const validationInstancePromoEmail = wrapper.instance().validationHandler('promoEmail');

      expect(validationInstancePromoUsername).toBeTruthy();
      expect(validationInstancePromoEmail).toBeTruthy();

      expect(validationInstancePromoUsername.type).toBe(Alert);
      expect(validationInstancePromoEmail.type).toBe(Alert);
    });
  });
  describe('login form submit',() => {
    let spyLoginEvent, spyValidationHandler;
    beforeEach(() =>{
      spyLoginEvent = jest.spyOn(wrapper.instance(), 'onPromoteUserEventHandler');
      spyValidationHandler = jest.spyOn(wrapper.instance(), 'validationHandler');
    });

    it('should call onPromoteUserEventHandler', async () => {
      wrapper.find('#promoteUserForm').simulate('submit');
      expect(spyLoginEvent).toHaveBeenCalled();
      expect(wrapper.instance().onPromoteUserEventHandler).toHaveBeenCalled();
    });

    it('should call validationHandler 14 times', async () => {
      promoUsername.instance().value = 'sampleUser';
      promoUsername.simulate('change');
      promoEmail.instance().value = 'user@mail.com';
      promoEmail.simulate('change');
      wrapper.find('#promoteUserForm').simulate('submit');
      expect(spyLoginEvent).toHaveBeenCalled();
      expect(spyValidationHandler).toHaveBeenCalled();
      expect(spyValidationHandler).toHaveBeenCalledTimes(14);
      expect(wrapper.instance().onPromoteUserEventHandler).toHaveBeenCalled();
    });
  });
});
