import React from 'react';
import ConversationTable from './ConversationTable' 
import {Link} from 'react-router-dom';


const Conversation = ({authenticated, emails, loading}) => {
    return (
        <div className = "container">
        {!authenticated ? (
            <div>
            <p>Please login or signup</p>
            <Link className="btn btn-dark" to="/login">
            Login
          </Link>
                <Link to = '/signup'>
                <button className = "btn btn-primary m-3">Signup</button>
            </Link>
           </div>


        ) : (loading ? (<p>Loading...</p>) : (
            <ConversationTable emails = {emails}/>
            
            ))
     }
        </div>

    )
}

export default Conversation;