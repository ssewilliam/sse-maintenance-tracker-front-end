import axios from 'axios';
import {
  USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL
} from './actionTypes';
import AppUrls from '../../AppUrls';

export const userRegistrationStart = () => {
  return {
    type: USER_REGISTRATION_START,
  };
};
export const userRegistrationSuccess = userData => {
  return {
    type: USER_REGISTRATION_SUCCESS,
    payload: userData,
  };
};
export const userRegistrationFail = errors => {
  return {
    type: USER_REGISTRATION_FAIL,
    payload: errors,
  };
};
export const registerUser = (userData) => {
  return dispatch => {
    dispatch(userRegistrationStart());
    return axios
      .post(AppUrls.register, userData.user)
      .then(response => {
        dispatch(userRegistrationSuccess(response.data.message));
      })
      .catch((error) => {
        dispatch(userRegistrationFail(error.response.data));
      });
  };
};