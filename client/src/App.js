import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login'

const App = () => {
	return (
		<Router>
			<Route exact path = '/' component = {Home} />
			<Route exact path = '/signup' component = {Signup} />
			<Route exact path = '/login' component = {Login} />
		</Router>
		)
}


export default App;	