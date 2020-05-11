const Email = require('../models/Email')
const User = require("../models/UserSchema");
const Customer = require("../models/CustomerSchema");
const SentMail = require('../models/SentMail')
const dayjs = require('dayjs')

exports.addEmail = async (req, res) => {
  
  let { recieverId, text, html, subject, frequency , startDate :{date, month, year} , frequencyUnit} = req.body;


  const senderId = req.user._id;
  try {
    const sender = await User.findOne({ _id: senderId });
    const reciever = await Customer.findOne({ _id: recieverId });
    if (!reciever) throw { error: "Invalid request" };
    if (reciever.createdBy !== senderId) throw { error: "Invalid Request"};
    const startDate = dayjs(`${year}-${month}-${date}`).toISOString()
    const endDate = dayjs(startDate).add(frequency, frequencyUnit).toISOString()
    const emailDetails = Email({
      recieverId,
      senderId,
      text,
      sender: sender.email,
      reciever: reciever.email,
      html,
      subject,
      createdAt: Date.now(),
      startDate ,
      endDate,
      frequency, 
      frequencyUnit
    });
    const resposnse = await emailDetails.save();
    console.log(resposnse);
     res.status(200).json(resposnse);

    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getSentEmails = async(req, res) => {
  const senderId = req.user._id;
  console.log("senderid", senderId)
  const recieverId = req.query.customer
  let resposnse = []
  try {
    const sentMails = await SentMail.find({senderId})
    sentMails.forEach(mail => {
      let currMail = {
        _id : mail._id,
        sentTime: mail.sentTime,
        recieverId:mail.recieverId,
        sender: mail.sender,
        reciever:mail.reciever,
        status:mail.status,
        subject: mail.subject,
        html: mail.html,
        text:mail.text
       }
       resposnse.push(currMail)
      
    })
    console.log(resposnse)
    res.status(200).json({emails:resposnse})
  }
  catch(error){
    console.log(error)
    res.status(400).json(error)
  }

}

