import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import store from "./redux/store";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import {getUserData} from './redux/actions/userActions';
import axios from 'axios';
import AuthRoute from './AuthRoute'
import Customers from './pages/Customers'
import EditCustomer from './components/EditCustomer';
import AddNewCustomer from './components/AddNewCustomer'
import AddScheduleMail from "./components/AddScheduleMail";
import ScheduledMails from "./components/ScheduledMails";
import  SendMailNow  from "./components/SendMailNow";

const App = () => {

	let token = localStorage.getItem('auth-token');
	if (token){
		axios.defaults.headers.common['auth-token'] = token;
		store.dispatch(getUserData())
	}
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <div className="container">
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/signup" component={Signup} />
          <AuthRoute exact path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path = '/customers' component = {Customers} />
          <Route path = '/customer/edit/:id' component = {EditCustomer} />
          <Route path = '/customer/add' component = {AddNewCustomer} />
          <Route path = '/email/scheduled/add/:customerId' component = {AddScheduleMail} />
          <Route path = '/email/schedule' component = {ScheduledMails} />
          <Route path = '/send/email/:customerId' component = {SendMailNow} />

        </div>
      </Router>
    </Provider>
  );
};

export default App;
