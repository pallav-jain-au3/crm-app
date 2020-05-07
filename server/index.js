const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
const isEmailVerified = require('./isEmailVerified')
const {addCustomer, getCustomers, updateCustomer, deleteCustomer} = require('./handlers/customerHandle')
const {addEmail} = require('./handlers/customerEmailHandle')
const mongoose = require("mongoose");
const cors = require("cors");
const {
  addUser,
  loginUser,
  sendEmailVerification,
  verifyEmail,
  getUserData,
} = require("./handlers/userHandler");

const auth = require("./auth");
require("dotenv").config();

app.use(express.json());
app.use(cors());
mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
  },
  () => console.log("connected to database")
);
// User Routes
app.post("/signup", addUser);
app.post("/login", loginUser);
app.get("/sendVerify", auth, sendEmailVerification);
app.get("/verify", verifyEmail);
app.get("/authUser", auth, getUserData);


// Auth Routes

app.post('/addCustomer',auth, isEmailVerified, addCustomer)
app.get('/customers', auth, isEmailVerified,getCustomers)
app.get('/customer/update/:id', auth, isEmailVerified, updateCustomer);
app.delete('/customer/delete/:id', auth, isEmailVerified, deleteCustomer);

// email routes
app.post('/email/add', auth, isEmailVerified, addEmail)


app.listen(port, () => console.log("listenning on 5000"));
