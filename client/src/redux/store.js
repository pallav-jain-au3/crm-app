import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import emailReducer from './reducers/emailReducer';
import userReducer from "./reducers/userReducer";
import customerReducer from './reducers/customerReducer';
import {LOGOUT_USER} from './types'

const intialState = {};
const middleware = [thunk];
const appReducer = combineReducers({
  user: userReducer,
  emails: emailReducer,
  customers : customerReducer
});
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
      state = undefined;
  }
  return appReducer(state, action);
}
const store = createStore(
  rootReducer,
  intialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
