const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require('mongoose');
const {addUser, loginUser, sendEmailVerification, verifyEmail}  = require('./handlers/userHandler')
app.use(express.json());
const auth = require('./auth')
 require("dotenv").config();
mongoose.connect(
 
  process.env.DB_HOST,
  {
    useNewUrlParser: true
  },
  () => console.log("connected to database")
)

app.post('/signup', addUser);
app.post('/login', loginUser)
app.get('/sendVerify',auth, sendEmailVerification)
app.get('/verify',verifyEmail )



app.listen(port, () => console.log("listenning on 5000"));