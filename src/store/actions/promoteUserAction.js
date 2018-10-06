import axios from 'axios';
import {
  USER_RANKING_START,
  USER_RANKING_SUCCESS,
  USER_RANKING_FAIL
} from './actionTypes';
import AppUrls from '../../AppUrls';

export const userRankingStart = () => {
  return {
    type: USER_RANKING_START,
  };
};
export const userRankingSuccess = userData => {
  return {
    type: USER_RANKING_SUCCESS,
    payload: userData,
  };
};
export const userRankingFail = errors => {
  return {
    type: USER_RANKING_FAIL,
    payload: errors,
  };
};
export const promoteUser = (userData) => {
  return dispatch => {
    dispatch(userRankingStart());
    return axios
      .put(AppUrls.users, userData.user)
      .then(response => {
        dispatch(userRankingSuccess(response.data.message));
      })
      .catch((error) => {
        dispatch(userRankingFail(error.response.data));
      });
  };
};
