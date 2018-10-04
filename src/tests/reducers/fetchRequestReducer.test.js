import {
  REQUEST_FETCHING_START,
  REQUEST_FETCHING_SUCCESS,
  REQUEST_FETCHING_FAIL
} from '../../store/actions/actionTypes';
import fetchRequestReducer from '../../store/reducers/fetchRequestsReducer';
const initialState = {
  loading: false,
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
  });
  describe('hasRequests in fetching requests', () => {
    it('should be false when fetching starts', () => {
      action.type = REQUEST_FETCHING_START;
      const newState = fetchRequestReducer(initialState, action);
      expect(newState.loading).toEqual(false);
      expect(newState.errors).toEqual({});
      expect(newState.hasRequests).toEqual(false);
    });
    it('should be when requests exist', () => {
      action.type = REQUEST_FETCHING_SUCCESS;
      const newState = fetchRequestReducer(initialState, action);

      expect(newState.hasRequests).toEqual(true);
      expect(newState.loading).toEqual(false);
      expect(newState.requests).toEqual(initialState.requests);
    });
    it('should be false when request fetching fails', () => {

      action.type = REQUEST_FETCHING_FAIL;
      const newState = fetchRequestReducer(initialState, action);

      expect(newState.hasRequests).toEqual(false);
      expect(newState.loading).toEqual(false);
      expect(newState.requests).toEqual(initialState.requests);
    });
  });
});
