import React from "react";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { connect} from 'react-redux'
import {scheduleMail} from '../redux/actions/emailActions'
class AddScheduleMail extends React.Component {
  constructor() {
    super();
    this.state = {
      recieverId: "",
      text: "",
      html: "",
      subject: "",
      frequency: "1",
      displayCalender: false,
      frequencyUnit: "day",
      date: new Date(),
      errors : {}
    };
  }

  handleSubmit = (e) => {
      e.preventDefault()
     const date  = new Date(this.state.date)
     const startDate = {
         date : date.getDate(),
         month : date.getMonth() + 1,
         year : date.getFullYear()
     }
    
     const scheduleData = {
         recieverId : this.state.recieverId,
         text : this.state.text,
         html : this.state.html,
         subject : this.state.subject,
         frequency : this.state.frequency,
         frequencyUnit : this.state.frequencyUnit,
         startDate
     }
     this.props.scheduleMail(scheduleData, this.props.history)
      
  }
  onChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
   
  };
  onDateChange = (date) => {
   
    this.setState({ date });
  };
  componentDidMount() {
    const customerId = this.props.match.params.customerId;
    if (customerId) {
      this.setState({
        ...this.state,
        recieverId: customerId,
      });
    }
  }
  render() {
    const calenderClass = this.state.displayCalender
      ? "calender"
      : "d-none calender";
   
    return (
      <div className="container outerContainer">
        <div className="heading">
          <h3>Schedule Email</h3>

        </div>
        {!this.props.authenticated ? (<p>Please login or signup</p>) : (
        <div className="form" onSubmit = {this.handleSubmit}>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                name="subject"
                placeholder="Enter subject"
                onChange={this.onChange}
                value={this.state.subject}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                name="html"
                placeholder="Enter html"
                onChange={this.onChange}
                value={this.state.html}
              />
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                name="text"
                placeholder="Enter email text"
                onChange={this.onChange}
                value={this.state.text}
              />
            </div>
            <div>
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={this.onChange}
                  name="frequency"
                >
                  <option>No of emails to send</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className = "row">
              <div className = "col-2">
                <button
                  type="button"
                  onClick={() =>
                    this.setState({
                      displayCalender: !this.state.displayCalender,
                    })
                  }
                >
                  {this.state.displayCalender ? "Close Calender" : "Show calender"}
                </button>
              </div>
              <div className={calenderClass}>
                <Calender
                  value={this.state.date}
                  name="date"
                  onChange={this.onDateChange}
                />
              </div>
         
              <div className="form-group col-2">
                <select
                  className="form-control"
                  onChange={this.onChange}
                  name="frequencyUnit"
                >
                  <option>Sending options</option>
                  <option value="month">Monthly</option>
                  <option value="day">Daily</option>
                </select>
              </div>
            </div>  

              <button className = "btn btn-primary" type = "submit" onClick = {this.handleSubmit}>Add schedule</button>
            </div>
          </form>
        </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
    authenticated : state.user.authenticated,
    error : state.emails.error
})
const mapActionToProps = {
    scheduleMail
}
export default connect(mapStateToProps, mapActionToProps)(AddScheduleMail);

