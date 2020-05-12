import React from "react";
import { connect } from "react-redux";
import { getCustomers , deleteCustomer} from "../redux/actions/customerAction";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; 

class Customers extends React.Component {
  componentDidMount() {
    this.props.getCustomers();
  }
  handleDelete = (customerId) => {
      this.props.deleteCustomer(customerId)
  }

  render() {
      dayjs.extend(relativeTime)
    const authenticated = this.props.authenticated;
    return (
      <div>
        <div>Customers</div>
        <Link to ='/customer/add'><button className = " m-3 btn btn-primary">Add customer</button></Link>
        {!authenticated ? (
          <div>
            Please Sign up or Login
            <div>
              <Link to="/signup">
                <button className="btn btn-danger">Signup</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {!this.props.customersData.customers.length ? (
              <p>No customer Added</p>
            ) : (
              <div>
                <ul className="list-group">
                  {this.props.customersData.customers.map((customer) => (
                    <li className="list-group-item" key={customer._id}>
                     <p>Name :{customer.name}</p>
                     <p> Email:{customer.email}</p>
                     <p>Added : {dayjs(customer.createdAt).fromNow()}</p>
                      <Link to = {`/customer/edit/${customer._id}`}><button className = "btn btn-dark">Edit</button></Link>
                      <button className = "btn m-3 btn-danger" onClick = {() =>this.handleDelete(customer._id)}>Delete</button>
                      <Link to = {`/email/scheduled/add/${customer._id}`}><button className = "btn btn-info m-3">Schedule email</button></Link>
                      <Link to = {'/send/email/' + customer._id}><button type = "button" className = "btn btn-light">Send Email Now</button></Link>
                    </li>
                  ))}
                </ul>
                
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  customersData: state.customers,
  authenticated: state.user.authenticated,
});

const mapActionsToProps = {
  getCustomers,
  deleteCustomer
};
export default connect(mapStateToProps, mapActionsToProps)(Customers);
