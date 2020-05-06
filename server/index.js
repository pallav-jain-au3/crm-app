const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const {addUser, loginUser, sendEmailVerification, verifyEmail, getUserData}  = require('./handlers/userHandler')

const auth = require('./auth')
 require("dotenv").config();

 app.use(express.json());
 app.use(cors())
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
app.get('/authUser', auth, getUserData)



app.listen(port, () => console.log("listenning on 5000"));