const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");
const multer = require("multer");
const upload = multer();

router.post("/register",userController.create);
router.get("/register", userController.getUser);
router.post("/authenticate", userController.authenticate);
router.patch("/register/:userId", userController.updatePasswordById);
router.delete("/register/:userId", userController.deleteUserById);
// user role authentication
router.patch("/role/:userId", userController.updateRoles);
module.exports = router;
