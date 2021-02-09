const Message = require('../models/message');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


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
  client.messages
  .create({
     body: req.body.content,
     from: '(207) 802-0104',
     to: req.body.sent_to
   })
  .then(response =>{
    const message = new Message({
      content: response.body,
      sent_to: response.to,
      status: respons.status,
      sent_by: req.userData
    });

    message.save.then(savedMessage=>{

    }).catch(error=> {
      console.log(error);
      res.status(500).json({
        message: 'Couldnt sent message Try again!',
        requested_body: req.body
      })
    })


  })

}



