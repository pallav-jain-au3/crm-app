const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
const isEmailVerified = require('./isEmailVerified')
const {addCustomer, getCustomers, updateCustomer, deleteCustomer, getCustomer} = require('./handlers/customerHandle')
const {addEmail, getSentEmails, getAllScheduledEmail,sendNowEmail, deleteScheduledMail} = require('./handlers/customerEmailHandle')
const mongoose = require("mongoose");
const cors = require("cors");
require('./cronJob')
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

app.post('/customer/add',auth, isEmailVerified, addCustomer)
app.get('/customers', auth, isEmailVerified,getCustomers)
app.post('/customer/update/:id', auth, isEmailVerified, updateCustomer);
app.delete('/customer/delete/:id', auth, isEmailVerified, deleteCustomer);
app.get('/customer/:id', auth, getCustomer)

// email routes
app.post('/email/schedule/add', auth, isEmailVerified, addEmail);
app.get('/email/sent', auth, getSentEmails);
app.get('/emails/schdeduled',auth, getAllScheduledEmail);
app.post('/email/sendNow', auth, sendNowEmail);
app.delete('/email/schedule/delete/:emailId', auth, deleteScheduledMail);

app.listen(port, () => console.log("listenning on 5000"));
