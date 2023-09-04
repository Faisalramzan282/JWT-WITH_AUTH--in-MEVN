const express = require('express');
const router = express.Router();
const cartViewController = require('../app/api/controllers/UserCartView');
router.post('/', cartViewController.createCartsInfo)
module.exports = router