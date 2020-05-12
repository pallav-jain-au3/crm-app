import {ADD_SCHEDULED_MAIL,SET_EMAILS, SET_EMAIL_LOADING, SET_SCHEDULED_MAILS, SET_EMAIL_ERRORS, UPDATE_SET_EMAIL, DELETE_SCHEDULED_MAIL} from '../types';
import axios from 'axios';
import {endpoint} from '../endpoint'
export const getSentMails = (customer) => dispatch => {
    setloading()
    axios.get(endpoint+ '/email/sent')
    .then(res => {
        dispatch({
            type:SET_EMAILS,
            payload: res.data.emails
        })
    })
    .catch(err =>{
        console.log(err)
        dispatch({
            type :SET_EMAIL_ERRORS,
            payload : err.response.data
        })
    })
}


const setloading  = () => dispatch => {
    dispatch({
        type: SET_EMAIL_LOADING
    })
    return
}

export const scheduleMail = (scheduleData,history) => dispatch=> {
    setloading()
    axios.post(endpoint + '/email/schedule/add', scheduleData)
   
    .then(res => {
        dispatch({
            type :ADD_SCHEDULED_MAIL,
            payload :res.data
        })
        history.push('/email/schedule')
    })
    .catch(err =>{
        console.log(err)
        dispatch({
            type :SET_EMAIL_ERRORS,
            payload : err.response.data
        })
    })
}


export const scheduledMails = () => dispatch => {
    dispatch({
        type : SET_EMAIL_LOADING
    })
    axios.get(endpoint + '/emails/schdeduled')
    .then(res => {
        dispatch({
            type:SET_SCHEDULED_MAILS,
            payload:res.data
        })
    })
    .catch(err =>{
        console.log(err)
        dispatch({
            type :SET_EMAIL_ERRORS,
            payload : err.response.data
        })
    })
}

export const sendMailNow = (emailData, history) => dispatch =>{
    axios.post(endpoint + '/email/sendNow',emailData)
    .then(res => {
        dispatch({
            type :UPDATE_SET_EMAIL,
            payload : res.data
        })
        history.push('/')
    })
    .catch(err =>{
        console.log(err)
        dispatch({
            type :SET_EMAIL_ERRORS,
            payload : err.response.data
        })
    })
}
export const deleteScheduledMail = (emailId) =>dispatch => {
    dispatch({type :SET_EMAIL_LOADING})
    axios.delete(endpoint + `/email/schedule/delete/${emailId}`)
    .then(res => {
        console.log(res.data)
        dispatch({
            type :DELETE_SCHEDULED_MAIL,
            payload : emailId
        })
        return
    })
    .catch(err =>{
        console.log(err)
        dispatch({
            type :SET_EMAIL_ERRORS,
            payload : err.response.data
        })
    })

}