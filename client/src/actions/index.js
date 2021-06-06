import axios from 'axios';
import { LOGIN } from '../constants/action-types';

export function login(query) {
  return async function (dispatch) {
    return axios.post('http://localhost:5000/api/auth/login', query)
      .then(response => {
        dispatch({ type: LOGIN, payload: response.data });
      })
  }
};
