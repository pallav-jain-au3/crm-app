const Email = require("../models/Email");
const User = require("../models/UserSchema");
const Customer = require("../models/CustomerSchema");
const SentMail = require("../models/SentMail");
const dayjs = require("dayjs");
const smtpTransport = require("../stmpTransport");
const { addSentMail } = require("../addSentMail");
exports.addEmail = async (req, res) => {
  let {
    recieverId,
    text,
    html,
    subject,
    frequency,
    startDate: { date, month, year },
    frequencyUnit,
  } = req.body;

  const senderId = req.user._id;
  try {
    const sender = await User.findOne({ _id: senderId });
    const reciever = await Customer.findOne({ _id: recieverId });
    if (!reciever) throw { error: "Invalid request" };
    if (reciever.createdBy !== senderId) throw { error: "Invalid Request" };
    const startDate = dayjs(`${year}-${month}-${date}`).toISOString();
    const endDate = dayjs(startDate)
      .add(frequency, frequencyUnit)
      .toISOString();
    const emailDetails = Email({
      recieverId,
      senderId,
      text,
      sender: sender.email,
      reciever: reciever.email,
      html,
      subject,
      createdAt: Date.now(),
      startDate,
      endDate,
      frequency,
      frequencyUnit,
    });
    const savedScheduledEmail = await emailDetails.save();
    const response = {
      createdAt: savedScheduledEmail.createdAt,
      _id : savedScheduledEmail._id,
      frequencyUnit :savedScheduledEmail.frequencyUnit,
      recieverId: savedScheduledEmail.recieverId,
      reciever: savedScheduledEmail.reciever,
      sender :savedScheduledEmail.sender,
      frequency: savedScheduledEmail.frequency,
      text: savedScheduledEmail.text,
      html: savedScheduledEmail.html,
      subject: savedScheduledEmail.subject,
      startDate: savedScheduledEmail.startDate,
      endDate: savedScheduledEmail.endDate,
      expired: savedScheduledEmail.expired,
      willBeSendToday: savedScheduledEmail.willBeSendToday,
    };

    res.status(200).json(response);

    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.getSentEmails = async (req, res) => {
  const senderId = req.user._id;
  let resposnse = [];
  try {
    const sentMails = await SentMail.find({ senderId });
    sentMails.forEach((mail) => {
      let currMail = {
        _id: mail._id,
        sentTime: mail.sentTime,
        recieverId: mail.recieverId,
        sender: mail.sender,
        reciever: mail.reciever,
        status: mail.status,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      };
      
      resposnse.push(currMail);
    });
    res.status(200).json({ emails: resposnse });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getAllScheduledEmail = async (req, res) => {
  const senderId = req.user._id;

  try {
    const savedScheduledEmails = await Email.find({ senderId });
    const response = [];
    savedScheduledEmails.forEach((email) => {
      const emailResponse = {
        createdAt: email.createdAt,
        frequencyUnit: email.frequencyUnit,
        subject: email.subject,
        html: email.html,
        text: email.text,
        expired: email.expired,
        willBeSendToday: email.willBeSendToday,
        _id: email._id,
        recieverId: email.recieverId,
        sender: email.senderId,
        reciever: email.reciever,
        startDate: email.startDate,
        endDate: email.endDate,
        frequency: email.frequency,
      };
      response.push(emailResponse);
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.sendNowEmail = async (req, res) => {
  const { recieverId, html, text, subject } = req.body;
  const senderId = req.user._id;
  const senderEmail = req.user.email;
 
  try {
    const customer = await Customer.findOne({ _id: recieverId });

    if (!customer) throw { error: "Invalid Request" };
    if (customer.createdBy !== senderId)
      throw { error: "Unauthorised Request" };
    const mailOptions = {
      from: senderEmail,
      to: customer.email,
      subject: subject,
      html: html,
      text: text,
    };
    const mailResponse = await smtpTransport.sendMail(mailOptions);
    const addToSentMail = await addSentMail(
      recieverId,
      senderId,
      customer.email,
      senderEmail,
      html,
      text,
      subject,
      "success"
    );

    const response = {
      recieverId: addToSentMail.recieverId,
      reciever: addToSentMail.reciever,
      sender: addToSentMail.sender,
      html: addSentMail.sender,
      text: addToSentMail.text,
      subject: addToSentMail.subject,
      sentTime: addToSentMail.sentTime,
      status: addToSentMail.status,
      _id: addToSentMail._id,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.deleteScheduledMail = async(req,res) => {
  const userId = req.user._id;
  const emailId = req.params.emailId;
  try {
    const email = await Email.findOne({_id : emailId})
    if (!email) throw {error : "Invalid Request"};
    if (email.senderId != userId) throw {error : "Unauthorised Request"}
    const response = await Email.deleteOne({_id :emailId})
    res.status(200).json({status : "deleted Successfully"}) 
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }
}