const db = require("../models");
const Offer = db.offer;
const Company = db.company;

exports.createNewOffer = (req, res) => {
    const {companyName, minInvest, maxInvest, fundingGoal, endDate, minToken, maxToken, companyTab, pitchTab, offeringTab} = req.body;

    Company.findOne(
        {companyName: companyName},
        (error, company) => {
            const offer = new Offer({
                companyName: companyName,
                companyDescription: company.description,
                companyCategory: company.category,
                minInvest: minInvest,
                maxInvest: maxInvest,
                fundingGoal: fundingGoal,
                endDate: endDate,
                minToken: minToken,
                maxToken: maxToken,
                companyTab: companyTab,
                pitchTab: pitchTab,
                offeringTab: offeringTab,
                totalInvestMoney: 0,
            })
        
            offer.save((err, savedOffer) => {
                if(err) {
                    res.status(500).send({message: err});
                    return;
                }
        
                Offer.find({companyName: companyName},(error, offers) => {
                    if(error) {
                        return res.status(500).send({message: error});
                    }
                    res.status(200).json(offers);
                })
            })
        }
    )
}

exports.getCompanyOffers = (req, res) => {
    const {searchCompanyName} = req.body;

    Offer.find(
        {companyName: searchCompanyName},
        (error, offers) => {
            if(error) {
                return res.status(500).send({message: error});
            }

            res.status(200).json(offers);
        }
    )
}

exports.updateDealTerms = (req, res) => {
    const {companyName, minInvest, maxInvest, fundingGoal, endDate, minToken, maxToken} = req.body;

    Offer.findOneAndUpdate(
        {companyName: companyName},
        {
            minInvest: minInvest,
            maxInvest: maxInvest,
            fundingGoal: fundingGoal,
            endDate: endDate,
            minToken: minToken,
            maxToken: maxToken
        },
        { new: true }
    )
    .exec((err, updatedOffer) => {
        if(err) {
            return res.status(500).send({message: err});
        }

        return res.status(200).send({data: updatedOffer});
    })
}

exports.deleteOfferById = (req, res) => {
    const {offerId} = req.body;
    Offer.findOneAndDelete(
        {_id: offerId}
    )
    .then(
        res.status(200).json({message:"Successfully deleted"})
    )
}

exports.updateInvest = (req, res) => {
    const {companyName, investAmount, investor} = req.body;
    Offer.findOneAndUpdate(
        {companyName: companyName},
        {
            $inc: {totalInvestMoney: investAmount},
            $addToSet:  {
                investors: {
                    investor: investor,
                    amount: investAmount
                }
            }
        },
        {new: true}
    )
    .exec((err, updatedOffer) => {
        if(err) {
            return res.status(500).send({message: err});
        }
        return res.status(200).send({data: updatedOffer});
    })
}

exports.getAllOffers = (req, res) => {
    Offer.find(
        {},
        (error, offers) => {
            if(error) {
                return res.status(500).send({message: error});
            }
            res.status(200).json(offers);
        }
    )
}