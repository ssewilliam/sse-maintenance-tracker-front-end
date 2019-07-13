import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import { loginUser } from '../../store/actions/loginAction';
import {
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from '../../store/actions/actionTypes';
import AppUrls from '../../AppUrls';
import Register from '../../containers/Register/Register';
import {mapDispatchToProps} from '../../containers/Register/Register';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userData = {
  user:{
    loginUsername: 'mems',
  }
};

describe('loginActions', () => {
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
    window.location.reload = jest.fn();
    store = mockStore(initialState);
    wrapper = shallow(
      <Register store={store} />
    );
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should start with initial login state as false', () => {
    expect(wrapper.props().loginStatus).toBe(false);
  });

  it('should start login and end with success', () => {
    moxios.stubRequest(AppUrls.login, {
      status: 200,
      response: { message: 'Successfully Logged in' },
    });

    const expectedActions = [
      { type: USER_LOGIN_START },
      {
        payload: 'Successfully Logged in',
        type: USER_LOGIN_SUCCESS,
      },
    ];
    return store.dispatch(loginUser(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should start login`and end with fail', () =>{
    moxios.stubRequest(AppUrls.login, {
      status:400,
      response: { error: 'user registeration failed' },
    });
    const expectedActions = [
      { type: USER_LOGIN_START }, 
      { type: USER_LOGIN_FAIL,
        payload: 'errors' }];

    const store = mockStore();
    return store.dispatch(loginUser(userData)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }); 
  });

  describe('Map Dispatch To Props', () => {
    it('should call onLogin action', () => {
      const user = {
        username:'meme',
        password:'@password'
      };
      const dispatchSpy = sinon.spy();
      const { onLogin } = mapDispatchToProps(dispatchSpy);
      onLogin();
      const expectedAction = loginUser(user);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.types).toBe(expectedAction.types);
    });
  });
});
