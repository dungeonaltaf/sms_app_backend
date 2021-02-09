


const Contact = require('../models/contact');
exports.getContacts = (req,res,next) => {
  console.log(req.query);
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  console.log("pageSize:"+pageSize);
  console.log("currentPage:"+(currentPage-1));
  let fetchedDocuments;
  const contactQuery = Contact.find();
  if (pageSize && currentPage){
    contactQuery.skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  contactQuery.
  then(documents=>{
    fetchedDocuments = documents;
    return Contact.count();
  }).
  then(count=>{
      res.status(200).json({
        message: "This is a response successful message",
        contacts: fetchedDocuments,
        maxContacts: count
      });
    }).catch(error =>{
      res.status(500).json({
        message: "Contact fetched failed. Contact admin!"
      })
    }); 
}

exports.getUserContacts = (req,res,next) => {
  console.log(req.query);
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  console.log("pageSize:"+pageSize);
  console.log("currentPage:"+(currentPage-1));
  let fetchedDocuments;
  console.log("user id is:"+req.userData.id);
  const contactQuery = Contact.find({'author.id':req.userData.id});
  if (pageSize && currentPage){
    contactQuery.skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  contactQuery.
  then(documents=>{
    fetchedDocuments = documents;
    return Contact.count();
  }).
  then(count=>{
      return res.status(200).json({
        message: "This is a response successful message",
        contacts: fetchedDocuments,
        maxContacts: count
      });
    }).catch(error =>{
      res.status(500).json({
        message: "Not able to fecth contact.Contact admin!"
      })
    })
}

exports.createContact = (req,res,next)=> {
console.log("in contact creation!");
const url = req.protocol + '://' + req.get("host");
const contact = new Contact({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  phone: req.body.phone,
  author: req.userData
});
console.log(contact);
contact.save().then((savedContact)=>{
  console.log(contact);
  return res.status(201).json({
  message: "Contact added successfully!",
  contact:{
    id: savedContact._id,
    firstName: savedContact.firstName,
    lastName: savedContact.lastName,
    phone: savedContact.phone,

  }
  });
}).catch(error=> {
  console.log(error);
  res.status(500).json({
    message: 'Contact Creation Failed. Try again!',
    requested_body: req.body
  })
})
}

exports.updateContact =   (req,res,next)=>{
  let imagePath = req.body.imagePath;

  if (req.file){
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  // console.log("image_path:"+imagePath);
  // console.log("title:"+req.body.title);
  const contact ={
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone
  };
  Contact.updateOne({_id: req.params.id},{$set:{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone
  }}).then(result => {
    // console.log(result);
    // console.log("Post:");
    if (result.n>0){
    res.status(200).json(
      {message: 'Update successful!',
      contactId: req.body.id
      });
    }
    else{
      res.status(401).json({message: "Not authorized!1"});
    } 
  }).catch(error=>{
    res.status(500).json({
      message: "Contact wasn't updated.Try again!"
    })
  })
}

exports.getContactById = (req,res,next) => {
  // console.log("Iam here!")
  Contact.findById(req.params.id).then(document=>{
    if (document){
      // console.log(document);
      return res.status(200).json(document);
    }
    else{
      res.status(404).json({message:'post not found!'});
    }
  }).catch(error=>{
    res.status(500).json({
      message: "Unable to fetch contact!"
    })
  })
}


exports.deleteContact = (req,res,next)=>{
  var id = req.params.id
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Contact.deleteOne({
      _id: id
    }).then(result => {
      console.log(result);
      return res.status(200).json({
        message: "Contact deleted!"
      });
    }).catch(error =>{
      res.status(500).json({
        message: "Deletion failed!"
      })
    })
  }
  else{
    console.log("request for id"+id);
      return res.status(200).json({
        message: "Contact didn't existed!"
      });
  }
}

// exports.commentOnPost = (req,res,next)=>{
//   let id = req.body.id;


//   Post.findById(id).then(post=>{
//     if (!post){
//       res.status(404).json({message:'post not found to comment!'});
//     }
//     let comment_content = req.body.comment;
//     let author = req.userData.firstName;
//     return Post.update({_id: id},
//       {$push: {
//         comments:{
//             comment: comment_content,
//             commentator: author
//           }
//         }
//       });
//   }).then(updatdPost => {
//     console.log(updatdPost);
//     return res.status(200).json({
//       message: "Comment added successfully!"
//     });
    
//   }).catch(error=>{
//     res.status(500).json({
//       message: "Couldn't added comment!"
//     });
//   });
// }