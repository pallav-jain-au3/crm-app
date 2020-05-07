const User = require("../models/UserSchema");
const { validateSignup, loginValidation } = require("../validations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stmpTransport = require("../stmpTransport");
const Cryptr = require("cryptr");
require("dotenv").config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

exports.addUser = async (req, res) => {
  console.log(req.body);
  let { valid, error } = validateSignup(req.body);
  console.log(valid, error);
  if (!valid) return res.status(400).json(error);

  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist)
    return res.status(400).json({
      email: "Email already exists",
    });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedData = await user.save();
    const token = jwt.sign(
      {
        _id: savedData._id,
      },
      process.env.TOKEN_SECRET
    );
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).json({ err: err.errmsg });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let { valid, error } = loginValidation(req.body);
  if (!valid) return res.status(400).json(error);
  const user = await User.findOne({
    email,
  });
  if (!user)
    return res.status(400).json({
      email: "User does not exists",
    });
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({
      password: "Invalid Password",
    });
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  res.status(200).json({ token: token });
};

exports.sendEmailVerification = async (req, res) => {
  let _id = req.user._id;
  try {
    let user = await User.findOne({ _id });
    if (!user) {
      return res.status(400).json({ error: "Invalid User" });
    }

    const host = req.get("host");

    const encryptId = cryptr.encrypt(_id);

    link = "http://" + req.get("host") + "/verify?id=" + encryptId;
    mailOptions = {
      to: user.email,
      subject: "Please confirm your Email account",
      html:
        "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
        link +
        ">Click here to verify</a>",
    };
    console.log(mailOptions);

    let response = await stmpTransport.sendMail(mailOptions);
    res.json({ status: "mail send" });
    return;
  } catch (err) {
    res.send("err");
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const encryptedId = req.query.id;
    const decryptedId = await cryptr.decrypt(encryptedId);
    const user = await User.findOne({ _id: decryptedId });
    if (!user) return res.status(400).json({ error: "Invalid Request" });
    if (user.isVerified) {
      return res.status(200).json({ status: "Already verfied" });
    }
    user.isVerified = true;
    const response = await User.findOneAndUpdate({ _id: user._id }, user);
    if (response) {
      res.status(200).json({ status: "verified successfully" });
    }
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.getUserData = async (req, res) => {
  let _id = req.user._id;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(400).json({ error: "Invalid Request" });
    }
    const userData = {
      email: user.email,
      _id,
      customers: user.customers,
      isVerified: user.isVerified,
    };
    res.status(200).json(userData);
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
    return;
  }
};
