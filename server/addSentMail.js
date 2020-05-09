const SentMail = require("./models/SentMail");

exports.addSentMail = async (
  recieverId,
  senderId,
  reciever,
  sender,
  html,
  text,
  subject,
  status
) => {

  try {

   
 const sentMail = await SentMail({
    recieverId,
    senderId,
    reciever,
    sender,
    html,
    text,
    subject,
    status,
  });

  const res = await sentMail.save()
  console.log(res)
}
catch(err){
    console.log(err)
}
};
