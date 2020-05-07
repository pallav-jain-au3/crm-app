import React from "react";
import { connect } from "react-redux";
import { verifyEmail } from "../redux/actions/userActions";
class Profile extends React.Component {
  handleVerify = () => {
    let response = verifyEmail();
    console.log(response);
  };
  render() {
    const { user, authenticated } = this.props.user;
    return (
      <div className="container">
        {authenticated ? (
          <div>
            <p>Email : {user.email}</p>
            {!user.isVerified ? (
              <div>
                <p>Click to verify your email</p>
                <button
                  className="btn bg-danger btn-light"
                  onClick={this.handleVerify}
                >
                  Verify
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <p>not authenticated</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(Profile);
