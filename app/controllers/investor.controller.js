const db = require("../models");
const Investor = db.investor;

exports.getAllInvestors = (req, res) => {
    Investor.find(
        {},
        (err, investors) => {
            if(err) {
                res.status(500).send({message: err});
                return
            }

            res.status(200).json(investors);
        }
    )
}

exports.updateData = (req, res) => {
    Investor.findOne({_id: req.body.id}, (err, investor) => {
        if(err) {
            console.log(err);
        } else {
            investor.firstName = req.body.editFirstName;
            investor.lastName = req.body.editLastName;
            investor.email = req.body.editEmail;
            investor.phone = req.body.editPhone;

            investor.save((err) => {
                if(err) {
                    console.log(err);
                } else {
                    res.status(200).json({message: "Updated correctly"});
                }
            })
        }
    })
}

exports.deleteInvestorById = (req, res) => {
    Investor.findOneAndRemove({_id: req.body.investorId})
    .then(
        res.status(200).json({message:"Successfully deleted"})
    )
}