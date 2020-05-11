import React from 'react';
import {connect} from 'react-redux'
import {editCustomerDetails} from '../redux/actions/customerAction';
import {Link} from 'react-router-dom'

class EditCustomer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customer: {
                name : "",
                email : ""
            }
        }
    }
  
componentDidMount(){
    const customer_id = this.props.match.params.id;
    const customer = this.props.customers.find(customer => customer._id == customer_id)
    this.setState({
        ...this.state,
        customer : customer
    })
   
}
cancelEdit = () => {
    this.props.history.push('/customers')
}

handleChange = (e) => {
   this.setState({
       customer : {
        ...this.state.customer,
        [e.target.name] :e.target.value
       }
      
   }) 
}
OnSubmit = (e) => {
    e.preventDefault()
    const customer = this.state.customer
    this.props.editCustomerDetails(customer, this.props.history)
}

    render(){
        return (
            <div>
                edit details
                {!this.props.authenticated ? (<div>
                    <p>Please login or signup</p>
                    <Link className="btn btn-dark" to="/login">
                    Login
                  </Link>
                        <Link to = '/login'>
                        <button className = "btn btn-primary">Login</button>
                    </Link>
                   </div>
        ) : (<div>
            {this.props.loading ? (<p>Loading</p>) : (
                <div>
                {this.state.customer == null  ? (<p>Customer Not found</p>) : (
                    <div>
                        <form onSubmit = {this.OnSubmit}>
                        <div className = "form-group">
                        <label className = "ml-2">Name</label>
                            <input name = "name" value = {this.state.customer.name} 
                            onChange = {this.handleChange}/>  
                        </div>
                        <div className = "form-group">
                        <label className = "ml-2">Email</label>
                            <input  name = "email" value = {this.state.customer.email} 
                            onChange = {this.handleChange}/>  
                        </div>
                           
                        <button className = "btn btn-danger m-2" onClick = {this.cancelEdit}>Cancel</button>
                        <button type = "submit" onClick = {this.onSubmit} className = "btn btn-primary">Update</button>
                        </form>
                    </div>
                )}
                </div>
            )}
            </div>
           
        )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    authenticated : state.user.authenticated,
    customers : state.customers.customers,
    loading : state.customers.loading,
})

const mapActionsToProps = {
    editCustomerDetails
}


export default connect(mapStateToProps, mapActionsToProps)(EditCustomer);