const config = require("../config/auth.config");
const db = require("../models");
const Investor = db.investor;
const Admin = db.admin;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  const role =req.body.role;

  if(role === "investor") {

    const user = new Investor({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 8),
      category: "PPF",
      avatar: "",
      role: role
    });

    user.save((err, saveduser) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const token = jwt.sign(
        { id: saveduser.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );

      // var authorities = [];

      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        token: token,
      });
    });
  } else {
    res.status(500).send({message: "You have to signup as Investor"});
  }
};

exports.signin = (req, res) => {

  Admin.findOne({
    $or: [
      {userName: req.body.userName},
      {email: req.body.userName}
    ]
  })
  .exec((err, user) => {
    
    if(err) {
      res.status(500).send({message:err});
      return ;
    }

    if(!user) {
      Investor.findOne({
        $or: [
          { userName: req.body.userName },
          { email: req.body.userName }
        ]
      })
      // .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password!" });
        }
  
        const token = jwt.sign({ id: user.id },
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: 86400, // 24 hours
                                });
  
        req.session.token = token;
  
        return res.status(200).send({
          id: user._id,
          role: user.role,
          token: token,
        });
      });
    } else {
      if(req.body.password !== user.password) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      req.session.token = token;

      return res.status(200).send({
        id: user._id,
        role: "admin",
        token: token,
      });
    }
  })

  
};

exports.resetPassword = async (req, res) => {
  Investor.findOne({
    email: req.body.email
  })
  .exec((err, user) => {
    if(err) {
      res.status(500).send({message: err});
      return;
    }

    if(!user) {
      return res.status(404).send({message: "Email is unregistered email"});
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    Investor.findOneAndUpdate({email: req.body.email}, {password:bcrypt.hashSync(req.body.newPassword, 8)})
    .exec((err, updatedUser) => {
      if(err) {
        return  res.status(500).send({message: err});
      }
      return res.status(200).send({message: "Success"});
    })
  })
}

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
