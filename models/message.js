const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

  content: {type: String, required: true},
  sent_to: {type: mongoose.Schema.Types.phone, ref:"Contact",required: true},
  status: {type: String,
  enum:['SUCCESS','FAILED','PENDING'],
  default:'PENDING'},
  sent_by: {id: {type: mongoose.Schema.Types.ObjectId,ref: "User", required: true},
            firstName:{type: String, ref: "User", required: true},
            lastName:{type: String, ref: "User", required: true},
            phone:{type: String, ref: "User", required: true}}
});

module.exports = mongoose.model('Message',messageSchema)
