const db = require("../models");
const Company = require("../models/company.model");
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

exports.updatePreference = (req, res) => {
    Investor.findOne({_id: req.body.id}, (err, investor) => {
        if(err) {
            return res.status(500).json({message: err});
        } else {
            investor.business = req.body.editBusinessType;
            investor.investSize = req.body.editInvestmentSize;
            investor.language = req.body.editLanguage;
            investor.howSoon = req.body.editInvestDay;

            investor.save((err) => {
                if(err) {
                    return res.status(400).json({message: err});
                }
                return res.status(200).json({message: "Updated correctly"});
            })
        }
    })
}

exports.updateSummary = (req, res) => {
    Investor.findOne({_id: req.body.id}, (err, investor) => {
        if(err) {
            return res.status(500).json({message: err});
        } else {
            investor.summary = req.body.editSummary;

            investor.save((err) => {
                if(err) {
                    return res.status(400).json({message: err});
                }
                return res.status(200).json({message: "Updated correctly"});
            })
        }
    })
}

exports.updateNotes = (req, res) => {

    const {id, note} = req.body;

    Investor.findOneAndUpdate(
        {_id: id},
        {$addToSet:{notes: note}},
    )
    .exec((err, updatedInvestor) => {
        if(err) {
            return res.status(500).send({message: err});
        }
        return res.status(200).send({message: "Success"});
    })
}

exports.deleteInvestorById = (req, res) => {
    Investor.findOneAndRemove({_id: req.body.investorId})
    .then(
        res.status(200).json({message:"Successfully deleted"})
    )
}