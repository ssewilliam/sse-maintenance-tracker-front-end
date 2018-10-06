import {
  REQUEST_FETCHING_ALL_START,
  REQUEST_FETCHING_ALL_SUCCESS,
  REQUEST_FETCHING_ALL_FAIL
} from '../actions/actionTypes';

const initialState = {
  loadingRequests: true,
  hasRequests: false,
  errors: {},
  requests: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_FETCHING_ALL_START:
    return {
      ...state,
      hasRequests: false,
      loadingRequests: true,
      errors: {},
    };
  case REQUEST_FETCHING_ALL_SUCCESS:
    return {
      ...state,
      hasRequests: true,
      requests: [...action.payload],
      loadingRequests: false,
      errors: {},
    };
  case REQUEST_FETCHING_ALL_FAIL:
    return {
      ...state,
      errors: action.payload,
      loadingRequests: false,
    };
  default:
    break;
  }
  return state;
};
export default reducer;
