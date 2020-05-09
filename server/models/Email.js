const mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  senderId: {
    type: String,
    required: true,
  },
  recieverId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  reciever: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  frequencyUnit: {
    type: String,
    default: "month",
  },
  startDate: {
    type : Date,
    required : true
  },
  endDate: {
    type : Date,
   required: true
  },
  error: {
    type: String,
    default: null,
  },
  subject: {
    type: String,
    default: "crm app test",
  },
  html: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  expired : {
      type : Boolean,
      default: false
  },
   willBeSendToday : {
      type : Boolean,
      default:"false"
  }
});

module.exports = mongoose.model("Email", EmailSchema);
