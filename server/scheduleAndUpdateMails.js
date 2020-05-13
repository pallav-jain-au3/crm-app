const Emails = require("./models/Email");
const dayjs = require("dayjs");

exports.scheduleAndUpdateEmails = async () => {
  try {
    const emails = await Emails.find({ expired: false });
    //console.log(emails)
    emails.forEach(async (email) => {
      try {
        if (!isExpired(email.endDate)) {
          const res = await Emails.findOneAndUpdate(
            { _id: email._id },
            { expired: true }
          );
        } else if (shouldSendToday(email.startDate, email.frequencyUnit)) {
          console.log(email)
          const res = await Emails.findOneAndUpdate(
            { _id: email._id },
            { willBeSendToday: true }
          );
        }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function isExpired(endDate) {
  let currDate = new Date();
  
   console.log(dayjs(endDate).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'))
   console.log(currDate, endDate)
  return dayjs(currDate).isBefore(endDate) 
}

function shouldSendToday(startDate, frequencyUnit) {
  let currDate = new Date();
  if (frequencyUnit == "day") {
    return true;
  } else if (frequencyUnit === "month") {
    if (dayjs(startDate).get("date") == currDate.getDate()){
        return true;
    }
  }
  return false;
}
