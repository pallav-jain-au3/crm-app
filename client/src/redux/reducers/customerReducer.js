import {SET_CUSTOMERS, SET_LOADING, SET_CUSTOMERS_ERRORS, SET_CUSTOMER, DELETE_CUSTOMER} from '../types' ;

const initialState = {
    customers : [],
    loading : false,
    error : null,
    customer : null
}

export default function(state = initialState, action) {
    switch(action.type){
        case SET_LOADING : 
            return {
                ...state ,
                loading : true
            }
        case SET_CUSTOMERS : 
            return {
                ...state,
                customers : action.payload,
                loading:false,
                error:null
            }    
        case SET_CUSTOMERS_ERRORS : 
            return {
                ...state,
                loading : false,
                error : action.payload
            }    
        case SET_CUSTOMER :
            return {
                ...state,
                loading :false,
                customer :action.payload,
                error : null
            } 
        case DELETE_CUSTOMER :
            let customers = state.customers  
            customers = customers.filter(customer => customer._id !== action.payload )   
            return {
                ...state,
                error:null,
                customers : [...customers]
            }   
        default : 
        return {
            ...state
        }
    }
}