const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
// for imaging binary saving 
const multer = require('multer');
const upload = multer();

router.post('/register', 
// function validate(req, res) {
//   console.log("request existed in middlware", req.body);
//     if (req.file) {
//       req.body.selectedImage = {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//       };
//     }
    userController.create
//   }
  )

router.get('/register', userController.getUser);
router.post('/authenticate', userController.authenticate);
// router.get('/authenticate', userController.getAuthenticate)
router.patch('/register/:userId', userController.updatePasswordById);
router.delete('/register/:userId', userController.deleteUserById)
module.exports = router;