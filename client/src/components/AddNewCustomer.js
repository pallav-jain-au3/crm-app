import React from "react";
import { connect } from "react-redux";
import {addNewCustomer} from '../redux/actions/customerAction'
class AddNewCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name : "",  
      error: {}
    };
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      email: this.state.email,
      name: this.state.name
    };
    this.props.addNewCustomer(newCustomer, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.customers.error) {
      this.setState({
        ...this.state,
        error: nextProps.customers.error,
      });
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className="container">
        <h1> Add new customer</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className={
                  this.state.error.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={this.handleChange}
                value={this.state.email}
                name="email"
                placeholder="Please enter customer's email-id"
              />
              <div className="invalid-feedback">
                {this.state.error.email ? this.state.error.email : null}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className={
                  this.state.error.name
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={this.handleChange}
                value={this.state.name}
                name="name"
                placeholder="Please enter name"
              />
              <div className="invalid-feedback">
                {this.state.error.name ? this.state.error.name : null}
              </div>
            </div>

            
            {this.state.error.error ? (<p className = "text-danger">{this.state.error.error}</p>): null}
      
           
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Add customer
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  customers: state.customers
});

const mapActionToProps = {
  addNewCustomer
};
export default connect(mapStateToProps, mapActionToProps)(AddNewCustomer);
