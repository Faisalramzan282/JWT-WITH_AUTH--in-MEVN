const express = require('express');
const router = express.Router();
const cartViewController = require('../app/api/controllers/UserCartView');
router.post('/', cartViewController.createCartsInfo)
// router.get('/', cartViewController.getAllCarts);
module.exports = router