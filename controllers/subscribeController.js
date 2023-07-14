const { ctrlWrapper } = require("../helpers/index");
const { HttpError } = require("../helpers/index");
const User = require("../models/userModel");
const { sendEmail} = require('../helpers/sendEmail')

const subscribeController = async (req, res, next) => { 
const { email } = req.body;
    const user = await User.findOne({ email });

  const subscribeEmail = {
    to: email,
    subject: "Subscribe to the newsletter",
    html: `<h3>You're wellcome!!!</h3> <p> You have subscribed to the newsletter from "So Yummy"</p>`,
  };

  if (!email) {
    throw HttpError("Missing required field email");
  }

  if (!user) {
    throw HttpError("Email not found");
  }
  await User.findByIdAndUpdate(user._id, {
    subscribe: true,
  });
  if (user.subscribe) {
   throw HttpError("You are already subscribed to the newsletter.");
  }

    await sendEmail(subscribeEmail);
  
    
    res.status(201).json({
        message: 'Subscribe was successful'
    })
}


module.exports = {
   subscribeController: ctrlWrapper(subscribeController) 
}
