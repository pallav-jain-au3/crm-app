import {SET_EMAILS, SET_LOADING} from '../types';
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
    .catch(err => {
        console.log(err)
    })
}


const setloading  = () => dispatch => {
    dispatch({
        type: 'SET_LOADING'
    })
    return
}

export const scheduleMail = (scheduleData) => dispatch=> {
    axios.post(endpoint + '/email/schedule/add', scheduleData)
    .then(res => console.log(res.data))
    .catch(err =>console.log(err))
}