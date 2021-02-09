const Message = require('../models/message');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));
exports.generateMessage = (req,res,next)=>{
  var otp =  Math.floor(100000 + Math.random() * 900000);
  // otp = otp.toString;
  var content = "Hi. Your OTP is "+otp;
  res.status(200).json({
    content: content,
    otp: otp
  });
}

exports.createMessage = (req,res,next)=>{
  const message = new Message({
    content: req.body.content,
    sent_to: req.body.sent_to,
    status: "PENDING",
    sent_by: req.userData
  });

}



