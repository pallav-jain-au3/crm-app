import React ,{Fragment}from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userActions';
import {withRouter}  from'react-router-dom'

class Navbar extends React.Component {

  handleLogout = () => {
    this.props.logoutUser(this.props.history) 
  }
 
  render(){
    const {authenticated} = this.props

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          { !authenticated  ? (
            <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          </Fragment>
          )
          :
          (<Fragment>
            <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customers">
              Customers
            </Link>
          </li>
          <li className="nav-item">
          <button className="btn btn-dark" onClick = {this.handleLogout}>
            Logout
          </button>
        </li>
          
          </Fragment>
          )
          }
        </ul>
      </nav>
    );
  }
  
}

const mapStateToProps = state => ({
  authenticated : state.user.authenticated
})
const mapActionsToProps = {
  logoutUser
}

export default withRouter(connect(mapStateToProps,mapActionsToProps)(Navbar));
