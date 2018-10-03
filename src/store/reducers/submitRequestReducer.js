import {
  REQUEST_CREATION_START, REQUEST_CREATION_SUCCESS, REQUEST_CREATION_FAIL,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  createStatus: false,
  errors: {},
  request: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_CREATION_START:
    return {
      ...state,
      loading: true,
      createStatus: false,
      errors: {},
    };
  case REQUEST_CREATION_SUCCESS:
    return {
      ...state,
      createStatus: true,
      loading: false,
      request: { ...action.payload },
      errors: {},
    };
  case REQUEST_CREATION_FAIL:
    return {
      ...state,
      loading: false,
      errors: { ...action.payload },
    };
  default:
    break;
  }
  return state;
};
export default reducer;
