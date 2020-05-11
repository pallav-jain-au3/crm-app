import axios from 'axios';
import {endpoint} from '../endpoint';
import {SET_CUSTOMERS,SET_CUSTOMER_LOADING, SET_CUSTOMERS_ERRORS, SET_CUSTOMER, DELETE_CUSTOMER} from '../types'


export const getCustomers = () => dispatch =>{
    dispatch({
       type : SET_CUSTOMER_LOADING
    })
    axios.get(endpoint +'/customers')
    .then(res => {
        dispatch({
            type:SET_CUSTOMERS,
            payload : res.data
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type :SET_CUSTOMERS_ERRORS,
            payload : err.response.data
        })
       
    })

}

export const getCustomerDetails = (customer_id) => dispatch => {
    dispatch({
        type: SET_CUSTOMER_LOADING
    })
    axios.get(endpoint +`/customer/${customer_id}`)
    .then(res => {
        console.log(res.data)
        dispatch({
            type :SET_CUSTOMER,
            payload : res.data
        })
    })
    .catch((err) => {
       console.error(err.response.data);
        dispatch({
          type: SET_CUSTOMERS_ERRORS,
          payload: err.response.data,
        });
      });
}

export const editCustomerDetails = (customerDetails, history) =>dispatch => {
  
    axios.post(endpoint + `/customer/update/${customerDetails._id}`, customerDetails)
    .then(res => {
        history.push('/customers')
    })
   
    .catch(error => console.log(error))
}

export const addNewCustomer = (newCustomerDetails, history) => dispatch => {
    axios.post(endpoint + '/customer/add', newCustomerDetails)
    .then((res) => {
        console.log(res)
        history.push('/customers')
    })
    .catch(error => {
        dispatch({
            type: SET_CUSTOMERS_ERRORS,
            payload : error.response.data
        })
    })
}

export const deleteCustomer = (customer_id) => dispatch=> {
    axios.delete(endpoint+`/customer/delete/${customer_id}`)
    .then(res => dispatch({
        type:DELETE_CUSTOMER,
        payload :customer_id
    }))
    .catch(error => {
        console.log(error)
        dispatch({
            type: SET_CUSTOMERS_ERRORS,
            payload : error.response.data
        })
    })
}