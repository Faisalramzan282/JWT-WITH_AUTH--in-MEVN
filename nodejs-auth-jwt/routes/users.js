const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.post('/register', userController.create);
router.get('/register', userController.getUser);
router.post('/authenticate', userController.authenticate);
// router.get('/authenticate', userController.getAuthenticate)
module.exports = router;