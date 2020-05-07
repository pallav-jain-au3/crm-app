const EmailSchema = require("../models/MailSchema");
const User = require("../models/UserSchema");
const Customer = require("../models/CustomerSchema");

exports.addEmail = async (req, res) => {
  
  const { recieverId, text, html, subject, time } = req.body;
  const senderId = req.user._id;
  try {
    const sender = await User.findOne({ _id: senderId });
    if (!sender) throw { error: "Invalid request" };
    const reciever = await Customer.findOne({ _id: recieverId });
    if (!reciever) throw { error: "Invalid request" };
    if (reciever.createdBy !== senderId) throw { error: "Invalid Request" };
    const emailDetails = EmailSchema({
      recieverId,
      senderId,
      text,
      sender: sender.email,
      reciever: reciever.email,
      time: Date.now(),
    });

    const resposnse = await emailDetails.save();
    console.log(resposnse);
    res.status(200).json({ status: "Added Successfully " });

    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

