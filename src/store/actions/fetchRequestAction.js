import axios from 'axios';
import {
  REQUEST_FETCHING_START,
  REQUEST_FETCHING_SUCCESS,
  REQUEST_FETCHING_FAIL
} from './actionTypes';
import AppUrls from '../../AppUrls';

export const requestFetchingStart = () => {
  return {
    type: REQUEST_FETCHING_START,
  };
};
export const requestFetchingSuccess = (request) => {
  return {
    type: REQUEST_FETCHING_SUCCESS,
    payload: request,
  };
};
export const requestFetchingFail = error => {
  return {
    type: REQUEST_FETCHING_FAIL,
    payload: error,
  };
};
export const fetchRequest = (requestId) => {
  return dispatch => {
    dispatch(requestFetchingStart());
    return axios
      .get(AppUrls.requests+'/'+requestId, {
        headers: {
          'token': `${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        dispatch(requestFetchingSuccess(response.data.requests));
      })
      .catch((error) => {
        dispatch(requestFetchingFail(error.response.data));
      });
  };
};