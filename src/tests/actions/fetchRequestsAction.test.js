import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import { fetchRequest } from '../../store/actions/fetchRequestsAction';
import {
  REQUEST_FETCHING_START,
  REQUEST_FETCHING_SUCCESS,
  REQUEST_FETCHING_FAIL
} from '../../store/actions/actionTypes';
import AppUrls from '../../AppUrls';
import Home from '../../containers/Home/Home';
import { mapDispatchToProps } from '../../containers/Home/Home';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const requestsResponse = {
  requests:[{},{}]
};

describe('fetchREquestActions', () => {
  let store, wrapper;
  beforeEach(() => {
    moxios.install();
    const initialState = {
      fetchRequest: {
        loading: false,
        hasRequests: false,
        errors: {},
        requests: [],
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <Home store={store} />
    );
    localStorage.removeItem('isLoggedIn');
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should start with initial hasRequests state as false', () => {
    expect(wrapper.props().hasRequests).toBe(false);
  });

  it('should start fetching and end with success', () => {
    moxios.stubRequest(AppUrls.requests, {
      status: 200,
      response: requestsResponse,
    });

    const expectedActions = [
      { type:   REQUEST_FETCHING_START,
      },
      {
        payload: requestsResponse.requests,
        type: REQUEST_FETCHING_SUCCESS,
      },
    ];
    return store.dispatch(fetchRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should start fetching and end with fail', () =>{
    moxios.stubRequest(AppUrls.requests, {
      status:400,
      response: { error: 'you have no requests' },
    });
    const expectedActions = [
      { type: REQUEST_FETCHING_START }, 
      { type: REQUEST_FETCHING_FAIL,
        payload: 'errors' }];

    const store = mockStore();
    return store.dispatch(fetchRequest()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }); 
  });

  describe('Map Dispatch To Props', () => {
    it('should call onFetch action', () => {
      const dispatchSpy = sinon.spy();
      const { onFetch } = mapDispatchToProps(dispatchSpy);
      onFetch();
      const expectedAction = fetchRequest();
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.types).toBe(expectedAction.types);
    });
  });
});
