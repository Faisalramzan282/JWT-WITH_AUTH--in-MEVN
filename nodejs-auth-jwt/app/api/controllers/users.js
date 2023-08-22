const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

module.exports = {
   create: function(req, res, next) {
      const data = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
      };
   const errors = [];  
   //   console.log("data in back-end server ==>", data);
   const usernamePattern = /^(?=.*\d)([A-Z][a-zA-Z0-9]*)$/;

   // console.log('body in expresss validator is ==>', body);
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!usernamePattern.test(data.username)) {
      errors.push('Username start with capital and include numbers');
   }
  if (!emailPattern.test(data.email)) {
    errors.push('Invalid Email');
  }
  if(data.password.length<8)
  {
   errors.push("Password must be 8 digit")
  }
  if(errors.length > 0)
  {
   return res.status(400).json({
      status: 400,
      message: 'Invalid email address',
    });
  }
  userModel.create(data)
      .then((createdUser) => {
          res.status(201).json({
              status: 201,
              msg: 'User created successfully',
              data: createdUser
          });
      })
      .catch((err) => {
          res.status(500).json({
              status: 500,
              msg: 'Error creating user',
              error: err.message
          });
      });
  
  },
  getUser: function(req, res) {
   // const userId = req.params._id; 

   userModel.find() 
       .then((foundUser) => {
           if (!foundUser) {
               return res.status(404).json({
                   status: 404,
                   msg: 'User not found',
                   data: null
               });
           }

           res.status(200).json({
               status: 200,
               msg: 'User retrieved successfully',
               data: foundUser
           });
       })
       .catch((err) => {
           res.status(500).json({
               status: 500,
               msg: 'Error retrieving user',
               error: err.message
           });
       });
},

 
 authenticate: async (req, res, next) => {
   console.log('request -------------->', req.body);
   try {
      const userInfo = await userModel.findOne({ email: req.body.email });

      if (!userInfo) {
         res.json({ status: "error", message: "Invalid email/password!!!", data: null });
         return;
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, userInfo.password);
      if (isPasswordValid) {
        //  for expiration of two days ======>   { expiresIn: 2 * 24 * 60 * 60 }
         const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: 2 * 24 * 60 * 60 });
         res.json({ status: "success", message: "User found!!!", data: { user: userInfo, token: token } });
      } else {
         res.json({ status: "error", message: "Invalid email/password!!!", data: null });
      }
   } catch (error) {
      next(error);
   }
   
},


}
