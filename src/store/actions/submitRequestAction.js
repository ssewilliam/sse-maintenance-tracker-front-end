import axios from 'axios';
import {
  REQUEST_CREATION_START,
  REQUEST_CREATION_SUCCESS,
  REQUEST_CREATION_FAIL
} from './actionTypes';
import AppUrls from '../../AppUrls';

export const requestCreationStart = () => {
  return {
    type: REQUEST_CREATION_START,
  };
};
export const requestCreationSuccess = requestData => {
  return {
    type: REQUEST_CREATION_SUCCESS,
    payload: requestData,
  };
};
export const requestCreationFail = errors => {
  return {
    type: REQUEST_CREATION_FAIL,
    payload: errors,
  };
};
export const createRequest = (requestData) => {
  return dispatch => {
    dispatch(requestCreationStart());
    return axios
      .post(AppUrls.requests, requestData.request, {
        headers: {
          'token': `${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        dispatch(requestCreationSuccess(response.data.message));
      })
      .catch((error) => {
        dispatch(requestCreationFail(error.response.data));
      });
  };
};
