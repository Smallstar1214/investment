const db = require("../models");
// const ROLES = db.ROLES;
const Investor = db.investor;
// const Company = db.company;
const Admin = db.admin;

checkDuplicateUsernameOrEmail = (req, res, next) => {

  // Username
  Admin.findOne({
    userName: req.body.userName
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      console.log('useradmin: ', user);
      res.status(400).send({ message: "Username is already in use!" });
      return;
    }

    if(req.body.role === "investor") {
      Investor.findOne({
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
      })
    } else {
        // Company.findOne({
        //   userName: req.body.userName
        // }).exec((err, user) => {
        //   if (err) {
        //     res.status(500).send({ message: err });
        //     return;
        //   }

        //   if (user) {
        //     console.log('user: ', user);
        //     res.status(400).send({ message: "Username is already in use!" });
        //     return;
        //   }
        // })
    }

    // Email
    Admin.findOne({
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

      if(req.body.role === "investor") {
        Investor.findOne({
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
        })
      } else {
          // Company.findOne({
          //   email: req.body.email
          // }).exec((err, user) => {
          //   if (err) {
          //     res.status(500).send({ message: err });
          //     return;
          //   }

          //   if (user) {
          //     res.status(400).send({ message: "Email is already in use!" });
          //     return;
          //   }
          // })
      }

      // Investor.findOne({
      //   phone: req.body.phone
      // }).exec((err, user) => {
      //   if (err) {
      //     res.status(500).send({ message: err });
      //     return;
      //   }
    
      //   if (user) {
      //     res.status(400).send({ message: "Phone is already in use!" });
      //     return;
      //   }
      // })
    
      next();

    })
  })
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
  isSameTwoPasswords,
  verifyCaptcha
};

module.exports = verifySignUp;
