const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  phone: {type: String, required: true, unique : true},
  author: {id: {type: mongoose.Schema.Types.ObjectId,ref: "User", required: true},
            firstName:{type: String, ref: "User", required: true},
            secondName:{type: String, ref: "User", required: true},
            phone:{type: String, ref: "User", required: true}},
});

module.exports = mongoose.model('Contact',postSchema)
