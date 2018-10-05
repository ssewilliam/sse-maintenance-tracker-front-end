import {
  REQUEST_FETCHING_START,
  REQUEST_FETCHING_SUCCESS,
  REQUEST_FETCHING_FAIL
} from '../../store/actions/actionTypes';
import fetchRequestReducer from '../../store/reducers/fetchRequestReducer';
const initialState = {
  fetchLoading: false,
  hasRequest: false,
  fetchError: {},
  request: [],
};
let action = {
  payload: initialState.request
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
      expect(newState.fetchLoading).toEqual(false);
      expect(newState.fetchError).toEqual({});
      expect(newState.hasRequest).toEqual(false);
    });
    it('should be when requests exist', () => {
      action.type = REQUEST_FETCHING_SUCCESS;
      const newState = fetchRequestReducer(initialState, action);
      expect(newState.hasRequest).toEqual(true);
      expect(newState.fetchLoading).toEqual(false);
      expect(newState.request).toEqual(initialState.request);
    });
    it('should be false when request fetching fails', () => {

      action.type = REQUEST_FETCHING_FAIL;
      const newState = fetchRequestReducer(initialState, action);

      expect(newState.hasRequest).toEqual(false);
      expect(newState.fetchLoading).toEqual(false);
      expect(newState.request).toEqual(initialState.request);
    });
  });
});
