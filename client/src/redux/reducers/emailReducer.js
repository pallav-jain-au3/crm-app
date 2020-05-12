import {SET_EMAILS, SET_EMAIL_LOADING,SET_SCHEDULED_MAILS, SET_EMAIL_ERRORS, UPDATE_SET_EMAIL, DELETE_SCHEDULED_MAIL, ADD_SCHEDULED_MAIL} from '../types';

const initialState = {
    emails : [],
    scheduledEmails : [],
    loading : false,
    errors : null
}

export default function(state = initialState, action){
    switch(action.type){
        case  SET_EMAIL_LOADING : 
            return {
            ...state,
            loading:true
        }
        case SET_EMAILS:
            return {
                ...state,
                loading : false,
                emails : action.payload,
                errors : null
            }
        case SET_SCHEDULED_MAILS :
            return {
                ...state,
                errors :null,
                loading : false,
                scheduledEmails : action.payload
            } 
        case ADD_SCHEDULED_MAIL : 
            let scheduledEmailsData = state.scheduledEmails
            scheduledEmailsData.push(action.payload) 
            console.log(scheduledEmailsData)
            return {
                ...state,
                loading:false,
                errors:null,
                scheduledEmails: scheduledEmailsData
            }   
        case SET_EMAIL_ERRORS : 
            return {
                ...state,
                loading :false,
                errors :action.payload
            }   
        case UPDATE_SET_EMAIL : 
        const emails = state.emails
        emails.push(action.payload)
            return {
                ...state,
                loading : false,
                errors : null,
                emails : emails
            }
        case DELETE_SCHEDULED_MAIL  : 
            let scheduledEmails = state.scheduledEmails;
           
            scheduledEmails = scheduledEmails.filter(scheduledEmail => scheduledEmail._id != action.payload)  
            return {
                ...state,
                scheduledEmails :scheduledEmails,
                loading: false,
                errors : null
            }         
        default : 
            return {
            ...state 
        }
    }
}
