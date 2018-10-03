import axios from 'axios';
import {
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from './actionTypes';
import AppUrls from '../../AppUrls';

export const userLoginStart = () => {
  return {
    type: USER_LOGIN_START,
  };
};
export const userLoginSuccess = userData => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: userData,
  };
};
export const userLoginFail = errors => {
  return {
    type: USER_LOGIN_FAIL,
    payload: errors,
  };
};
export const loginUser = (userData) => {
  return dispatch => {
    dispatch(userLoginStart());
    return axios
      .post(AppUrls.login, userData.user, {
        headers: {
          'Authorization': 'Basic ' + btoa(userData.user.loginUsername + ':' + userData.user.loginPassword)
        },
      })
      .then(response => {
        dispatch(userLoginSuccess(response.data.message));
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', userData.user);
      })
      .catch((error) => {
        dispatch(userLoginFail(error.response.data));
      });
  };
};
