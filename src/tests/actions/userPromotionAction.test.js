import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import { promoteUser } from '../../store/actions/promoteUserAction';
import {
  USER_RANKING_START,
  USER_RANKING_SUCCESS,
  USER_RANKING_FAIL,
} from '../../store/actions/actionTypes';
import AppUrls from '../../AppUrls';
import Register from '../../containers/Register/Register';
import { mapDispatchToProps } from '../../containers/Register/Register';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userData = {
  username:'mems'
};

describe('promoteUserAction', () => {
  let store, wrapper;
  beforeEach(() => {
    moxios.install();
    const initialState = {
      registerLogin:{
        loading: false,
        registrationStatus: false,
        registerLogin: false,
        loginStatus: false,
        promoStatus: false,
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

  it('should start with initial promoStatus state as false', () => {
    expect(wrapper.props().promoStatus).toBe(false);
  });

  it('should start userPromotion and end with success', () => {
    moxios.stubRequest(AppUrls.users, {
      status: 200,
      response: { message: 'you have been promoted' },
    });

    const expectedActions = [
      { type: USER_RANKING_START },
      {
        payload: 'you have been promoted',
        type: USER_RANKING_SUCCESS,
      },
    ];
    return store.dispatch(promoteUser(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should start userPromotion and end with fail', () =>{
    moxios.stubRequest(AppUrls.users, {
      status:400,
      response: { error: 'user not promoted' },
    });
    const expectedActions = [
      { type: USER_RANKING_START }, 
      { type: USER_RANKING_FAIL,
        payload: 'errors' }];

    const store = mockStore();
    return store.dispatch(promoteUser(userData)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }); 
  });

  describe('Map Dispatch To Props', () => {
    it('should call onPromoteUser action', () => {
      const user = {
        promoUsername:'meme',
        promoEmail:'me@mail.com',
      };
      const dispatchSpy = sinon.spy();
      const { onPromoteUser } = mapDispatchToProps(dispatchSpy);
      onPromoteUser();
      const expectedAction = promoteUser(user);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.types).toBe(expectedAction.types);
    });
  });
});
