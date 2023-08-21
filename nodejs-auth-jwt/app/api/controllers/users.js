const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
module.exports = {
   create: function(req, res, next) {
      const data = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
      };
     console.log("data in back-end server ==>", data)
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
         const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
         res.json({ status: "success", message: "User found!!!", data: { user: userInfo, token: token } });
      } else {
         res.json({ status: "error", message: "Invalid email/password!!!", data: null });
      }
   } catch (error) {
      next(error);
   }
 
},

}
