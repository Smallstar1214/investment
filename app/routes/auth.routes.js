const express = require('express');
const router = express.Router();
const { checkDuplicateUsernameOrEmail, checkRolesExisted, isSameTwoPasswords} = require("../middlewares/verifySignUp");
const { signup, signin, resetPassword } = require("../controllers/auth.controller");

router.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);
router.post("/signin", signin);
router.post("/resetPassword", isSameTwoPasswords, resetPassword);

module.exports = router;