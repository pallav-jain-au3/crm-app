import React from 'react'
import {connect} from 'react-redux'
import {sendMailNow} from '../redux/actions/emailActions'
const initalState = {
    recieverId : "",
            text : "",
            html : "",
            subject :"",
            error : {}
}
class SendMailNow extends React.Component {
    constructor (){
        super()
        this.state = initalState
    }
    componentDidMount(){
        this.setState({
            recieverId : this.props.match.params.customerId
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const emailData = {
            recieverId : this.state.recieverId,
            text : this.state.text,
            html: this.state.html,
            subject : this.state.subject
        }

        this.props.sendMailNow(emailData, this.props.history)
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name] :e.target.value
        })
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.emails.errors){
            this.setState({
                error :nextProps.emails.errors
            })
        }
    }
    render(){
        console.log()
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
                placeholder="Enter text"
                onChange={this.onChange}
                value={this.state.text}
              />
            </div>

            <div>
                <p className = "m-2 text-danger">{this.props.emails.errors ? this.props.emails.errors.error : null}</p>
            </div>
            <div>
              <button className = "btn btn-primary" type = "submit" onClick = {this.handleSubmit}>Send Now</button>
              </div>
          </form>
        </div>
        )}
      </div>
    );
        
    } 
}

const mapStateToProps = state => ({
    authenticated : state.user.authenticated,
    emails :state.emails
})

const mapActionsToProps = {
    sendMailNow
}
export default connect(mapStateToProps, mapActionsToProps)(SendMailNow);