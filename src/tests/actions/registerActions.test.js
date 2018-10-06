import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import { registerUser } from '../../store/actions/registerAction';
import {
  USER_REGISTRATION_START,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
} from '../../store/actions/actionTypes';
import AppUrls from '../../AppUrls';
import Register from '../../containers/Register/Register';
import {mapDispatchToProps} from '../../containers/Register/Register';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userData = {
  username:'mems'
};

describe('registerActions', () => {
  let store, wrapper;
  beforeEach(() => {
    moxios.install();
    const initialState = {
      registerLogin:{
        loading: false,
        registrationStatus: false,
        registerLogin: false,
        loginStatus: false,
        errors: {},
        user: {}
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <Register store={store} />
    );
    localStorage.removeItem('isLoggedIn');
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should start with initial registerLogin state as false', () => {
    expect(wrapper.props().registrationStatus).toBe(false);
  });

  it('should start registerLogin and end with success', () => {
    moxios.stubRequest(AppUrls.register, {
      status: 201,
      response: { message: 'Successful signup' },
    });

    const expectedActions = [
      { type: USER_REGISTRATION_START },
      {
        payload: 'Successful signup',
        type: USER_REGISTRATION_SUCCESS,
      },
    ];
    return store.dispatch(registerUser(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should start registerLogin and end with fail', () =>{
    moxios.stubRequest(AppUrls.register, {
      status:400,
      response: { error: 'user registeration failed' },
    });
    const expectedActions = [
      { type: USER_REGISTRATION_START }, 
      { type: USER_REGISTRATION_FAIL,
        payload: 'errors' }];

    const store = mockStore();
    return store.dispatch(registerUser(userData)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }); 
  });

  describe('Map Dispatch To Props', () => {
    it('test if onRegister is mapped to props', () => {
      const user = {
        username:'meme',
        email:'me@mail.com',
        password:'@password'
      };
      const dispatch = jest.fn();
      const props = mapDispatchToProps(dispatch);

      props.onRegister(user);
      expect(typeof props.onRegister).toEqual('function');
    });
    it('should call onRegister action', () => {
      const user = {
        username:'meme',
        email:'me@mail.com',
        password:'@password'
      };
      const dispatchSpy = sinon.spy();
      const { onRegister } = mapDispatchToProps(dispatchSpy);
      onRegister(user);
      const expectedAction = registerUser(user);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(typeof spyLastCall).toBe(typeof expectedAction);
    });
  });
});
