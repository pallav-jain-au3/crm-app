const mongoose = require('mongoose')
 customerEmailchema = mongoose.Schema({
    createdAt :{
        type : Date,
        default:Date.now()
    },
    senderId : {
        type : String,
        required : true
    },
    recieverId :{
        type : String,
        required : true
    },
    sender : {
        type : String,
        required : true
    },
    reciever :{
        type : String,
        required : true
    },
    time : {
        type : Date,
        required : true
    },
    subject:{
        type: String,
        default : "crm app test"
    },
    html:{
        type : String,
        default : ""
    },
    text : {
        type : String ,
        default : ""
    },
    isActive : {
        type :Boolean, 
        default : true
    }
    
})

module.exports = mongoose.model("email", customerEmailchema) 