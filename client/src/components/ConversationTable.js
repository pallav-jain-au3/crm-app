import React from 'react';
import  ConversationTableRow from './ConversationTableRow'


const ConversationTable = ({emails}) => {
 
  
    return(
        <div>
        {emails.length === 0  ? (
            <p> Conversation is empty </p>
        ) : (
            <div>
            <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
        {emails.map(email => <ConversationTableRow key = {email._id} email = {email} />)}
        
        </tbody>
        </table>
        </div>)}
        </div>
    )
}

export default ConversationTable;