const mgEmail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL } = process.env;

mgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL };
  mgEmail.send(email);
  return true;
};

module.exports = { sendEmail };
