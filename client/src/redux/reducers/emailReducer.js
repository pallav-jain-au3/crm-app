import {SET_EMAILS, SET_LOADING} from '../types';
const initialState = {
    emails : [],
    loading : false,
}

export default function(state = initialState, action){
    switch(action.type){
        case  SET_LOADING : 
            return {
            ...state,
            loading:true
        }
        case SET_EMAILS:
            return {
                ...state,
                loading : false,
                emails : action.payload
            }
        default : 
            return {
            ...state 
        }
    }
}