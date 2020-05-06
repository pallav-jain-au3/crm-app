import {SIGNUP_USER, SET_LOADING, SET_USER, SET_ERRORS} from '../types';
import axios from 'axios';
let endpoint = 'http://localhost:5000'
const setLoading = () => dispatch => {
    dispatch({
        type: SET_LOADING
    })
};

export const signupUser = (userData, history) => dispatch => {
    dispatch(setLoading())
    axios.post(`${endpoint}/signup`, userData)
    .then(res =>{
         setAuthorizationToken(res.data.token)
         dispatch(getUserData())
         history.push('/')
    })
    .catch(err => {
        console.error(err.response.data)
        dispatch({
            type:SET_ERRORS,
            payload : err.response.data
        })
    })
}

const setAuthorizationToken = token => {
    localStorage.setItem("auth-token", token);
    axios.defaults.headers.common["auth-token"] = token;
  };

const getUserData  = () =>dispatch => {
   axios.get(endpoint+'/authUser')
   .then(res =>{   
        return dispatch ({
        type :SET_USER,
        payload:res.data

   })})
   .catch(err => {
       console.log(err)
   })
}