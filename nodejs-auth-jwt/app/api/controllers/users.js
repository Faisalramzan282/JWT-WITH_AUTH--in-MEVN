const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const express = require('express');
const app = express();
app.set('secretKey', 'nodeRestApi');
module.exports = {
   create: function(req, res, next) {
      const data = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
      };
   const errors = [];  
   const usernamePattern = /^(?=.*\d)([A-Z][a-zA-Z0-9]*)$/;
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
  const user = new userModel(data);
    user.save()
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
         const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h'});
         res.json({ status: "success", message: "User found!!!", data: { user: userInfo, token: token } });
      } else {
         res.json({ status: "error", message: "Invalid email/password!!!", data: null });
      }
   } catch (error) {
      next(error);
   }
},
updatePasswordById: async (req, res, next) => {
     const saltRound = 10;
    try {
      const newPassword = req.body.newPassword;
      const hashPassword = await bcrypt.hash(newPassword, saltRound)
      await userModel.findByIdAndUpdate(req.params.userId, {
        password: hashPassword,
        username: req.body.username
      });
     res.json({ status: "success", message: "Password updated successfully!!!", data: null });
    } catch (error) {
      res.json({ status: "Failed to update", message: "Failed to update password", data: null });
      next(error);
    }
  },
deleteUserById: async (req, res, next) => {
    try {
      await userModel.findByIdAndRemove(req.params.userId);
      res.json({ status: "success", message: "User deleted successfully!!!", data: null });
    } catch (error) {
      res.json({ status: "Failed", message: "Not deleted ", data: null });
      next(error);
    }
  },
  updateRoles:  async (req, res, next) => {
    try {
      const newRole = req.body.role;
      await userModel.findByIdAndUpdate(req.params.userId, {
         role: newRole
      });
     res.json({ status: "success", message:"Role updated successfully!!!", data: null });
    } catch (error) {
      res.json({ status: "Failed to update", message: "Failed to update Roles", data: null });
      next(error);
    }
  },


}
