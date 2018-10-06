import {
  REQUEST_FETCHING_ALL_START,
  REQUEST_FETCHING_ALL_SUCCESS,
  REQUEST_FETCHING_ALL_FAIL
} from '../../store/actions/actionTypes';
import fetchRequestReducer from '../../store/reducers/fetchRequestsReducer';
const initialState = {
  loadingRequests: false,
  hasRequests: false,
  errors: {},
  requests: [],
};
let action = {
  payload: initialState.requests
};

describe('fetchRequestReducer', () => {
  it('should return initial state', () => {
    const newState = fetchRequestReducer(initialState, {});
    expect(newState).toEqual(initialState);
    const newState2 = fetchRequestReducer({}, {});
    expect(newState2).toEqual({});
  });
  describe('hasRequests in fetching requests', () => {
    it('should be false when fetching starts', () => {
      action.type = REQUEST_FETCHING_ALL_START;
      const newState = fetchRequestReducer(initialState, action);
      expect(newState.loadingRequests).toEqual(true);
      expect(newState.errors).toEqual({});
      expect(newState.hasRequests).toEqual(false);
    });
    it('should be when requests exist', () => {
      action.type = REQUEST_FETCHING_ALL_SUCCESS;
      const newState = fetchRequestReducer(initialState, action);

      expect(newState.hasRequests).toEqual(true);
      expect(newState.loadingRequests).toEqual(false);
      expect(newState.requests).toEqual(initialState.requests);
    });
    it('should be false when request fetching fails', () => {

      action.type = REQUEST_FETCHING_ALL_FAIL;
      const newState = fetchRequestReducer(initialState, action);

      expect(newState.hasRequests).toEqual(false);
      expect(newState.loadingRequests).toEqual(false);
      expect(newState.requests).toEqual(initialState.requests);
    });
  });
});
