import axios from "axios";
import {
  CREATE_TWEET,
  FOLLOW_USER,
  GET_TIMELINE,
  GET_USER_DATA,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  RETWEET,
  SET_TOKEN,
  SIGNUP,
  SIGNUP_ERROR,
} from "../constants/action-types";

const API_ENDPOINT = "http://localhost:5000/api";

export function signup(query) {
  return async function (dispatch) {
    return axios
      .post(`${API_ENDPOINT}/auth/signup`, query)
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
      .post(`${API_ENDPOINT}/auth/login`, query)
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
      .post(`${API_ENDPOINT}/tweet`, query, {
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
    return axios(`${API_ENDPOINT}/user`, {
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
    return axios(`${API_ENDPOINT}/tweet/timeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch({ type: GET_TIMELINE, payload: response.data });
    });
  };
}

export function getProfileTimeline(token) {
  return async function (dispatch) {
    return axios(`${API_ENDPOINT}/tweet/profile-timeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch({ type: "GET_PROFILE_TIMELINE", payload: response.data });
    });
  };
}

export function setToken(token) {
  return function (dispatch) {
    dispatch({ type: SET_TOKEN, payload: token });
  };
}

export function followUser({ token, username }) {
  return async function (dispatch) {
    return axios
      .post(
        `${API_ENDPOINT}/user/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({ type: FOLLOW_USER, payload: response.data });
      });
  };
}

export function retweet({ token, tweet }) {
  return async function (dispatch) {
    const result = await axios
      .post(`http://localhost:5000/api/tweet/${tweet._id}/retweet`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({ type: RETWEET, payload: response.data });
      });
    return result;
  };
}
