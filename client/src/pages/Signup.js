import React from "react";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
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
      confirmPassword: this.state.confirmPassword,
    };
    this.props.signupUser(user, this.props.history);
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
        <h1> Signup form</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="signUpEmail"
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
                id="signUpPassword"
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
            <div className="form-group">
              <input
                type="password"
                id="signUpConfirmPassword"
                className={
                  this.state.error.confirmPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={this.handleChange}
                value={this.state.confirmPassword}
                name="confirmPassword"
                placeholder="Please enter confirm password"
              />
              <div className="invalid-feedback">
                {this.state.error.confirmPassword
                  ? this.state.error.confirmPassword
                  : null}
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Signup
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
  signupUser,
};
export default connect(mapStateToProps, mapActionToProps)(Signup);
