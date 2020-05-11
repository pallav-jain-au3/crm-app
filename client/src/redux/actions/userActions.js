import { SET_LOADING, SET_USER, SET_ERRORS, LOGOUT_USER } from "../types";
import axios from "axios";
import {endpoint} from '../endpoint'
const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

export const signupUser = (userData, history) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post(`${endpoint}/signup`, userData)
    .then((res) => {
      setAuthorizationToken(res.data.token);
      dispatch(getUserData());
      history.push("/");
    })
    .catch((err) => {
      console.error(err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const loginUser = (userData, history) => (dispatch) => {
  dispatch(setLoading());
  axios
    .post(`${endpoint}/login`, userData)
    .then((res) => {
      setAuthorizationToken(res.data.token);
      dispatch(getUserData());
      history.push("/");
    })
    .catch((err) => {
      console.error(err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

const setAuthorizationToken = (token) => {
  localStorage.setItem("auth-token", token);
  axios.defaults.headers.common["auth-token"] = token;
};

export const getUserData = () => (dispatch) => {
  axios
    .get(endpoint + "/authUser")
    .then((res) => {
      return dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const verifyEmail = () => {
  let status;
  axios
    .get(endpoint + "/sendVerify")
    .then((res) => {
      status = res;
    })
    .catch((err) => console.log(err));
  return status;
};


export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('auth-token')
  dispatch({
    type:LOGOUT_USER
  })
  history.push('/')

}