const Customer = require("../models/CustomerSchema");
const { validateCustomer } = require("../validations");

exports.addCustomer = async (req, res) => {
  const { valid, error } = validateCustomer(req.body);
  if (!valid) {
    return res.status(400).json(error);
  }
  const createdBy = req.user._id;
  try {
    const customerExist = await Customer.findOne({ email: req.body.email });
    if (customerExist && customerExist.createdBy === createdBy) {
      throw { email: "Customer already exists" };
    }
    const newCustomer = new Customer({
      name: req.body.name,
      email: req.body.email,
      createdBy,
    });

    let customer = await newCustomer.save();

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getCustomers = async (req, res) => {
  const createdBy = req.user._id;
  try {
    let customers = Customer.find({}).where("createdBy").equals(createdBy);
    res.status(200).json(customers);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
};

exports.updateCustomer = async (req, res) => {
  const _id = req.params.id;
  const createdBy = req.user._id;

  try {
    const currentCustomer = await Customer.findOne({ _id });
    if (!currentCustomer) throw { error: "Invalid Request" };
    if (currentCustomer.createdBy != createdBy)
      throw { error: "Unthourised request" };
    const customer = {
      email: req.body.email,
      name: req.body.name,
    };
    const updatedCustomer = await Customer.findOneAndUpdate({ _id }, customer);
    console.log(updatedCustomer);
    res.status(200).json({ status: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
exports.deleteCustomer = async (req, res) => {
  const createdBy = req.user._id;
  const _id = req.params.id;
  console.log(_id);
  try {
    const customer = await Customer.findOne({ _id });
    if (!customer) throw { error: "Invalid Request" };
    if (customer.createdBy !== createdBy)
      throw { error: "Unauthorised request" };
    const response = await Customer.deleteOne({ _id });
    res.status(200).json({ status: "Removed Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};


