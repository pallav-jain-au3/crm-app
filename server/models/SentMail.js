const mongoose = require("mongoose");
sentEmailSchema = mongoose.Schema({
  sentTime: {
    type: Date,
    default: Date.now(),
  },
  senderId: {
    type: String
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
  status: {
    type: String
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
});

module.exports = mongoose.model("sentEmail", sentEmailSchema);
