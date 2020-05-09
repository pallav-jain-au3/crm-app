const Emails = require("./models/Email");
const dayjs = require("dayjs");

exports.scheduleAndUpdateEmails = async () => {
  try {
    const emails = await Emails.find({ expired: false });
    emails.forEach(async (email) => {
      try {
        if (isExpired(email.endDate)) {
          const res = await Emails.findOneAndUpdate(
            { _id: email._id },
            { expired: true }
          );
        } else if (shouldSendToday(email.startDate, email.frequencyUnit)) {
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
  let currDate = new Date().toISOString();
  return dayjs(endDate).isBefore(currDate) ? true : false;
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
