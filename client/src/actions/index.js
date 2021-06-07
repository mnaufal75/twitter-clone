import axios from 'axios';
import { LOGIN, LOGOUT, CREATE_TWEET, GET_TIMELINE } from '../constants/action-types';

export function login(query) {
  return async function (dispatch) {
    return axios.post('http://localhost:5000/api/auth/login', query)
      .then(response => {
        dispatch({ type: LOGIN, payload: response.data });
      })
  }
};

export function logout() {
  return function (dispatch) {
    dispatch({ type: LOGOUT });
  }
};

export function createTweet(query) {
  return async function (dispatch) {
    return axios.post('http://localhost:5000/api/tweet', query)
      .then(() => {
        dispatch({ type: CREATE_TWEET });
      });
  }
};

export function getTimeline(token) {
  return async function (dispatch) {
    return axios('http://localhost:5000/api/tweet/timeline', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        dispatch({ type: GET_TIMELINE, payload: response.data });
      });
  }
};
