import axios from "axios";
import {
  CREATE_TWEET,
  GET_TIMELINE,
  GET_USER_DATA,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  SET_TOKEN,
  SIGNUP,
  SIGNUP_ERROR,
} from "../constants/action-types";

export function signup(query) {
  return async function (dispatch) {
    return axios
      .post("http://localhost:5000/api/auth/signup", query)
      .then((response) => {
        dispatch({ type: SIGNUP, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SIGNUP_ERROR, payload: error.response });
      });
  };
}

export function login(query) {
  return async function (dispatch) {
    return axios
      .post("http://localhost:5000/api/auth/login", query)
      .then((response) => {
        dispatch({ type: LOGIN, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_ERROR, payload: error.response });
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: LOGOUT, payload: "" });
  };
}

export function createTweet({ token, query }) {
  return async function (dispatch) {
    return axios
      .post("http://localhost:5000/api/tweet", query, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: CREATE_TWEET });
      });
  };
}

export function getUserData(token) {
  return async function (dispatch) {
    return axios("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch({ type: GET_USER_DATA, payload: response.data });
    });
  };
}

export function getTimeline(token) {
  return async function (dispatch) {
    return axios("http://localhost:5000/api/tweet/timeline", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch({ type: GET_TIMELINE, payload: response.data });
    });
  };
}

export function setToken(token) {
  return function (dispatch) {
    dispatch({ type: SET_TOKEN, payload: token });
  };
}
