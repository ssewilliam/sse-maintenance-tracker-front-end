import {
  USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL, USER_LOGIN_START,
  USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
  USER_RANKING_START, USER_RANKING_SUCCESS,
  USER_RANKING_FAIL
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  registrationStatus: false,
  loginStatus: false,
  promoStatus: false,
  errors: {},
  user: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case USER_RANKING_START:
    return {
      ...state,
      loading: true,
      promoStatus: false,
      errors: {},
    };
  case USER_RANKING_SUCCESS:
    return {
      ...state,
      promoStatus: true,
      loading: false,
      user: { ...action.payload
      },
      errors: {},
    };
  case USER_RANKING_FAIL:
    return {
      ...state,
      loading: false,
      errors: { ...action.payload
      },
    };
  case USER_LOGIN_START:
    return {
      ...state,
      loading: true,
      loginStatus: false,
      errors: {},
    };
  case USER_LOGIN_SUCCESS:
    return {
      ...state,
      loginStatus: true,
      loading: false,
      user: { ...action.payload
      },
      errors: {},
    };
  case USER_LOGIN_FAIL:
    return {
      ...state,
      loading: false,
      errors: { ...action.payload
      },
    };
  case USER_REGISTRATION_START:
    return {
      ...state,
      loading: true,
      registrationStatus: false,
      loginStatus: false,
      errors: {},
    };
  case USER_REGISTRATION_SUCCESS:
    return {
      ...state,
      registrationStatus: true,
      loginStatus: false,
      loading: false,
      user: { ...action.payload },
      errors: {},
    };
  case USER_REGISTRATION_FAIL:
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