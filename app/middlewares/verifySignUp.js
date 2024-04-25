const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    userName: req.body.userName
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      console.log('user: ', user);
      res.status(400).send({ message: "Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

isSameTwoPasswords = (req, res, next) => {
  if(req.body.password === req.body.newPassword) {
    res.status(400).send({message:'New password has to be different from current password'});
  }

  next();
}

verifyCaptcha = async (req, res, next) => {
  const captchaResponse = req.body.captchaResponse;

  console.log('key: ', process.env.GOOGLE_CAPTCHA_SECRET_KEY);

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.GOOGLE_CAPTCHA_SECRET_KEY}&response=${captchaResponse}`,
  });

  if (data.success) {
    // CAPTCHA verification successful
    next();
  } else {
    // CAPTCHA verification failed
    res.status(400).json({ message: 'CAPTCHA verification failed' });
  }
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  isSameTwoPasswords,
  verifyCaptcha
};

module.exports = verifySignUp;
