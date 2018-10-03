import submitRequestReducer from '../../store/reducers/submitRequestReducer';
import {
  REQUEST_CREATION_START,
  REQUEST_CREATION_SUCCESS,
  REQUEST_CREATION_FAIL,
} from '../../store/actions/actionTypes';

const initialState = {
  loading: false,
  createStatus: false,
  errors: {},
  request: {},
};

describe('submitRequestReducer', () => {
  it('should return initial state', () => {
    const newState = submitRequestReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  
  it('should change loading to true when registration starts', () => {
    const action = { type: REQUEST_CREATION_START };
    const newState = submitRequestReducer(initialState, action);
    expect(newState.loading).toEqual(true);
    expect(newState.loading).toEqual(true);
    expect(newState.errors).toEqual({});
    expect(newState.createStatus).toEqual(false);
  });

  describe('createStatus', () => {
    let action;
    beforeEach(() =>{
      initialState.request = {
        title: 'this is a request title',
        type: 'repair',
        description: 'this is the description of a request',
      };
      action = {
        payload: initialState.request
      };
    });

    it('should be true when request is created', () => {
      action.type = REQUEST_CREATION_SUCCESS;
      const newState = submitRequestReducer(initialState, action);

      expect(newState.createStatus).toEqual(true);
      expect(newState.loading).toEqual(false);
      expect(newState.request).toEqual(initialState.request);
    });

    it('should be false when request creation fails', () => {

      action.type = REQUEST_CREATION_FAIL;
      const newState = submitRequestReducer(initialState, action);

      expect(newState.createStatus).toEqual(false);
      expect(newState.loading).toEqual(false);
      expect(newState.request).toEqual(initialState.request);
    });
  });
});
