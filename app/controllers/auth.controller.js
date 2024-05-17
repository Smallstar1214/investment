const config = require("../config/auth.config");
const db = require("../models");
const Investor = db.investor;
const Admin = db.admin;
const Company = db.company;

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
      role: role,
      summary: "",
      business: [],
      investSize: 0,
      language: [],
      hwoSoon:0
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
          expiresIn: 86400, 
        }
      );

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
    const company = new Company({
      companyName: req.body.userName,
      phone: req.body.phone,
      role: role,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    company.save((err, savedCompany) => {
      if(err) {
        return res.status(500).send({message: err});
      }

      const token = jwt.sign(
        { id: savedCompany.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, 
        }
      );

      req.session.token = token;
      res.status(200).send({
        id: savedCompany._id,
        userName: savedCompany.companyName,
        role: savedCompany.role,
        token: token,
      })
    })
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
          Company.findOne(
            {companyName: req.body.userName},
            (err, user) => {
              if(err) {
                res.status(500).send({message: err});
                return ;
              }
  
              if(!user) {
                res.status(404).send({message: "User Not Found"});
                return;
              }

              var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );

              if(!passwordIsValid) {
                return res.status(401).send({message: "Invalid Password!"});
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
                userName: user.companyName,
                token: token,
              });

            }
          )
        } else {
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

          if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
          }
          const token = jwt.sign({ id: user._id },
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
            userName: user.userName,
            token: token,
          });
        }
      });
    } else {
      if(req.body.password !== user.password) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      const token = jwt.sign({ id: user._id },
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
        userName: user.userName,
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
