const mongoose = require('mongoose');
const CustomerSchema = mongoose.Schema({
    name : {
        type :String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default :Date.now()
    },
    createdBy : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Customers", CustomerSchema)
