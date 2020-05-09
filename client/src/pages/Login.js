import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: {},
    };
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.error) {
      this.setState({
        ...this.state,
        error: nextProps.user.error,
      });
    }
  }
  render() {
    return (
      <div className="container">
        <h1> Login form</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="loginEmail"
                className={
                  this.state.error.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={this.handleChange}
                value={this.state.email}
                name="email"
                placeholder="Please enter your email"
              />
              <div className="invalid-feedback">
                {this.state.error.email ? this.state.error.email : null}
              </div>
            </div>
            <div className="form-group">
              <input
                type="password"
                id="LoginPassword"
                className={
                  this.state.error.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={this.handleChange}
                value={this.state.password}
                name="password"
                placeholder="Please enter password"
              />
              <div className="invalid-feedback">
                {this.state.error.password ? this.state.error.password : null}
              </div>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  loginUser
};
export default connect(mapStateToProps, mapActionToProps)(Login);
