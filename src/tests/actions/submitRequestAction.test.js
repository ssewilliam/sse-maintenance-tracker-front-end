import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import {
  createRequest,
} from '../../store/actions/submitRequestAction';
import {
  REQUEST_CREATION_START,
  REQUEST_CREATION_SUCCESS,
  REQUEST_CREATION_FAIL,
} from '../../store/actions/actionTypes';
import AppUrls from '../../AppUrls';
import SubmitRequest from '../../containers/Requests/SubmitRequest/SubmitRequest';
import {mapDispatchToProps} from '../../containers/Requests/SubmitRequest/SubmitRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const requestData = {
  title:'this is a title'
};

describe('registerActions', () => {
  let store, wrapper;
  beforeEach(() => {
    moxios.install();
    const initialState = {
      postRequest: {
        loading: false,
        createStatus: false,
        errors: {},
        request: {},
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <SubmitRequest store={store} />
    );
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should start with initial create request state as false', () => {
    expect(wrapper.props().createStatus).toBe(false);
  });

  it('should start request submission and end with success', () => {
    moxios.stubRequest(AppUrls.requests, {
      status: 201,
      response: {
        message: 'request created successfully'
      },
    });

    const expectedActions = [
      { type: REQUEST_CREATION_START },
      {
        payload: 'request created successfully',
        type: REQUEST_CREATION_SUCCESS,
      },
    ];
    return store.dispatch(createRequest(requestData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should start request submission and end with fail', () =>{
    moxios.stubRequest(AppUrls.requests, {
      status:400,
      response: { error: 'request creation failed' },
    });
    const expectedActions = [
      { type: REQUEST_CREATION_START }, 
      { type: REQUEST_CREATION_FAIL,
        payload: 'errors' }];

    const store = mockStore();
    return store.dispatch(createRequest(requestData)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }); 
  });

  describe('Map Dispatch To Props', () => {
    it('should call onCreate action', () => {
      const request = {
        title:'this is a title',
        type:'repair',
        description:'this is the request description'
      };
      const dispatchSpy = sinon.spy();
      const { onCreate } = mapDispatchToProps(dispatchSpy);
      onCreate();
      const expectedAction = createRequest(request);
      const spyLastCall = dispatchSpy.args[0][0];
      expect(spyLastCall.types).toBe(expectedAction.types);
    });
  });
});
