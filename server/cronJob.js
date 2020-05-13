const cron = require("node-cron");
const smptTransport = require("./stmpTransport");
const { scheduleAndUpdateEmails } = require("./scheduleAndUpdateMails");
const { addSentMail } = require("./addSentMail");
const Email = require("./models/Email");


cron.schedule("0    38 15   *    *    *", async function () {
  try{
     await scheduleAndUpdateEmails();
     await sendActiveMails();
  }
  catch(err){
    console.log(err)
  }
 
});

async function sendActiveMails() {
  try {
    const emails = await Email.find({}).where("willBeSendToday").equals(true);
    console.log(emails)
    if (emails.length) {
      let result = await Promise.all(
        emails.map((email) => {
          mailOptions = {
            to: email.reciever,
            subject: email.subject,
            html: email.html,
            text: email.text,
          };
           smptTransport
            .sendMail(mailOptions)
            .then( (res) =>{
              console.log(res)

              return Email.findOneAndUpdate(
                { _id: email._id },
                {
                  willBeSendToday: false,
                }
            
              )
              })
            .then(() => {
              return addSentMail(
                email.recieverId,
                email.senderId,
                email.reciever,
                email.sender,
                email.html,
                email.text,
                email.subject,
                "success"
              );
            }
            
            )
        })
      );
     
    }
  } catch (err) {
    console.log("this",err.message);
   
    return err
  }
 

}
