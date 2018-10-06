import {
  REQUEST_FETCHING_START,
  REQUEST_FETCHING_SUCCESS,
  REQUEST_FETCHING_FAIL
} from '../actions/actionTypes';

const initialState = {
  fetchLoading: false,
  hasRequest: false,
  fetchError: {},
  request: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_FETCHING_START:
    return {
      ...state,
      hasRequest: false,
      fetchError: {},
      loading:true,
    };
  case REQUEST_FETCHING_SUCCESS:
    return {
      ...state,
      hasRequest: true,
      request: [...action.payload],
      fetchError: {},
      loading:false
    };
  case REQUEST_FETCHING_FAIL:
    return {
      ...state,
      fetchError: [...action.payload],
    };
  default:
    break;
  }
  return state;
};
export default reducer;
