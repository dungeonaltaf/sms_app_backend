const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contacts')

const check_auth = require("../middleware/check-auth");

console.log("inside route of contacts!");
router.get("",ContactController.getContacts);

router.get("/user",check_auth,ContactController.getUserContacts);

router.post("",check_auth,ContactController.createContact);

router.put("/:id",check_auth,ContactController.updateContact);

router.get("/:id",ContactController.getContactById);

router.delete("/:id",check_auth,ContactController.deleteContact);

// router.post("/comment",check_auth,PostController.commentOnPost);

// router.get("s",(req,res,next) => {
//   Post.find().then(documents=>{
//     // console.log(documents);
//     return res.status(200).json({
//       message: "This is a response successful message",
//       posts: documents
//     });
//   });
// });

module.exports = router;
