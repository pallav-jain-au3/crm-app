import React, { Component } from "react";
import { connect } from "react-redux";
import { scheduledMails, deleteScheduledMail } from "../redux/actions/emailActions";
class ScheduledMails extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.scheduledMails();
  }
   
  handlDelete = (emailId) => {
      this.props.deleteScheduledMail(emailId)
  }


  render() {
    return (
      <div>
        {!this.props.authencticated ? (
          <p>Please login or signin</p>
        ) : (
          <div>
            {this.props.loading ? (
              <p>Loading</p>
            ) : (
              <div>
                {!this.props.scheduledMailsData.length ? (
                  <p>No mail Scheduled yet</p>
                ) : (
                  <div className="container m-5">
                    <ul className="list-group">
                      <li
                        key={Math.floor(Math.random() * 999999999999)}
                        className="list-group-item"
                      >
                        <div className="row">
                          <div className="col-2">
                            <h5>Customer</h5>
                          </div>
                          <div className="col-2">
                            <h5>Subject</h5>
                          </div>
                          <div className="col-2">
                            <h5>Frequecny</h5>
                          </div>
                          <div className="col-2">
                            <h5>Sending Option</h5>
                          </div>
                        </div>
                      </li>
                      <>
                        {this.props.scheduledMailsData.map((email) => (
                          <li key={email._id} className="list-group-item">
                            <div className="row">
                              <div className="col-2">{email.reciever}</div>
                              <div className="col-2">{email.subject}</div>
                              <div className="col-2">{email.frequency}</div>
                              <div className="col-2">
                                {email.frequencyUnit === "day"
                                  ? "daily"
                                  : "monthly"}
                              </div>
                              <div className="col-2">
                                <button className="btn btn-primary">
                                  Edit
                                </button>
                              </div>
                              <div className="col-2">
                                <button onClick = {() => this.handlDelete(email._id)} className="btn btn-danger">
                                  delete
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  authencticated: state.user.authenticated,
  scheduledMailsData: state.emails.scheduledEmails,
  errors: state.emails.errors,
  loading: state.emails.loading,
});
const mapActionToProps = {
  scheduledMails,
  deleteScheduledMail
  
};
export default connect(mapStateToProps, mapActionToProps)(ScheduledMails);
