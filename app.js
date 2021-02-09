"use strict";
const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Contact = require('./models/contact');
const User = require('./models/user');
const contactsRoutes = require('./routes/contacts');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
mongoose.connect("mongodb+srv://altaf_hussain:mZMmOXzWQq0jhBrQ@cluster0.u1tdy.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=> {
  console.log("Mongo db is connected!");
}).catch(() => {
  console.log("connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("images")));
// app.use("/",express.static(path.join(__dirname,"angular")));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept, multipart/form-data, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, PUT, PATCH, GET, OPTIONS");
  next();
});



app.use("/api/contacts",contactsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages",messageRoutes);
// app.use((req,res,next) =>{
//   return res.status(200).json({
//     message: "altaf we made it"
//   });
// })
module.exports = app;
