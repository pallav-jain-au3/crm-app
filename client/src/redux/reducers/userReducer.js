import { SET_LOADING, SET_USER, SET_ERRORS, LOGOUT_USER } from "../types";

let initialState = {
  user: null,
  loading: false,
  error: null,
  authenticated: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        authenticated : true,
        error: null,
      };
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
