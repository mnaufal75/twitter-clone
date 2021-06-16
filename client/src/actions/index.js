import axios from 'axios';
import { LOGIN, LOGOUT, CREATE_TWEET, GET_USER_DATA, GET_TIMELINE, SET_TOKEN } from '../constants/action-types';

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

export function createTweet({ token, query }) {
  return async function (dispatch) {
    return axios.post('http://localhost:5000/api/tweet', query, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch({ type: CREATE_TWEET });
      });
  }
};

export function getUserData(token) {
  return async function (dispatch) {
    return axios('http://localhost:5000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
        dispatch({ type: GET_USER_DATA, payload: response.data });
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

export function setToken(token) {
  return function (dispatch) {
    dispatch({ type: SET_TOKEN, payload: token });
  }
};
