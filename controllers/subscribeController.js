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
    html: `<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 20px;">
  <td class="content-block" style="margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;">
   You're wellcome!!!
  </td>
</tr>
<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">
  <td class="content-block" style="margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;color: #8BAA36; vertical-align: top;">
   You have subscribed to the newsletter from "So Yummy"
  </td>
</tr>
<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">
  <td class="content-block" style="margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;">
   Now you will be the first to learn about new recipes that have appeared on our website.
  </td>
</tr>
<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px;">
  <td class="content-block" style="margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;">
  Cook with pleasure and enjoy the prepared dishes!!!
  </td>
</tr>
<tr style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; cursor: pointer">
  <td class="content-block" style="margin: 0; padding: 0 0 20px; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top;">
    <a href="https://so-yummy-two.vercel.app/main" class="btn-primary" style="margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; background-color: #8BAA36; border: solid #8BAA36; border-width: 10px 20px; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize;">Visit our website for the most delicious recipes</a>
  </td>
</tr>`
  };

  if (!email) {
    throw HttpError("Missing required field email");
  }

  if (!user) {
    res.status(403).json({
      message: 'Email not found. You need to register.'
    })
   
  }
  await User.findByIdAndUpdate(user._id, {
    subscribe: true,
  });
  if (user.subscribe) {
    res.status(409).json({
       message: 'You are already subscribed to the newsletter'
    })
  }

    await sendEmail(subscribeEmail);
  
    
    res.status(201).json({
        message: 'Subscribe was successful'
    })
}


module.exports = {
   subscribeController: ctrlWrapper(subscribeController) 
}
