import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import store from './redux/store';
import {Provider} from 'react-redux'

const App = () => {
	return (
		<Provider store = {store}>
		<Router>
			<Route exact path = '/' component = {Home} />
			<Route exact path = '/signup' component = {Signup} />
			<Route exact path = '/login' component = {Login} />
		</Router>
		</Provider>
		)
}


export default App;	