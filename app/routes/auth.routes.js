const express = require('express');
const router = express.Router();
const { checkDuplicateUsernameOrEmail, isSameTwoPasswords} = require("../middlewares/verifySignUp");
const { signup, signin, resetPassword } = require("../controllers/auth.controller");

router.post("/signup", checkDuplicateUsernameOrEmail, signup);
router.post("/signin", signin);
router.post("/resetPassword", isSameTwoPasswords, resetPassword);

module.exports = router;