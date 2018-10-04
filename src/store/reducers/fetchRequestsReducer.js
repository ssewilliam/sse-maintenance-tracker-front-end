import {
  REQUEST_FETCHING_START,
  REQUEST_FETCHING_SUCCESS,
  REQUEST_FETCHING_FAIL
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  hasRequests: false,
  errors: {},
  requests: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_FETCHING_START:
    return {
      ...state,
      hasRequests: false,
      errors: {},
    };
  case REQUEST_FETCHING_SUCCESS:
    return {
      ...state,
      hasRequests: true,
      requests: [...action.payload],
      errors: {},
    };
  case REQUEST_FETCHING_FAIL:
    return {
      ...state,
      errors: [...action.payload],
    };
  default:
    break;
  }
  return state;
};
export default reducer;
