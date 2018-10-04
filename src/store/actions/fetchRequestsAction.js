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
export const requestFetchingSuccess = (requests) => {
  return {
    type: REQUEST_FETCHING_SUCCESS,
    payload: requests,
  };
};
export const requestFetchingFail = errors => {
  return {
    type: REQUEST_FETCHING_FAIL,
    payload: errors,
  };
};
export const fetchRequest = () => {
  return dispatch => {
    dispatch(requestFetchingStart());
    return axios
      .get(AppUrls.requests, {
        headers: {
          'token': `${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        dispatch(requestFetchingSuccess(response.data.requests));
      })
      .catch((error) => {
        dispatch(requestFetchingFail(error.response));
      });
  };
};
