import React from "react";
import {connect} from 'react-redux';
import {getSentMails} from '../redux/actions/emailActions';
import Conversation from '../components/Conversation'
class Home extends React.Component {

  componentDidMount(){
   
      this.props.getSentMails()
    
 }

  render() {
    const loading = this.props.loading
    return (
      <div className="container">
      <h1>Home</h1>
      <div className = "row">
        <div className = "col-10">
        <Conversation loading = {loading} authenticated = {this.props.authenticated} emails = {this.props.emails} />
        </div>
      </div>
      
       </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emails: state.emails.emails,
  loading : state.emails.loading,
  authenticated : state.user.authenticated
})

const mapActionToProps = {
 getSentMails 
}
export default connect(mapStateToProps, mapActionToProps)(Home);
