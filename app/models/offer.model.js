const mongoose = require("mongoose");

const Offer = mongoose.model(
    "Offer",
    new mongoose.Schema({
        companyName: {
            type: String,
            required: true
        },
        companyDescription: {
            type: String,
            required: true
        },
        companyCategory: {
            type: String,
            required: true
        },
        minInvest: {
            type: Number,
            required: true
        },
        maxInvest: {
            type: Number,
            required: true
        },
        fundingGoal: {
            type: Number,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        minToken: {
            type: Number,
            required: true
        },
        maxToken: {
            type: Number,
            required: true
        },
        companyTab: {
            type: String,
        },
        pitchTab: {
            type: String,
        },
        offeringTab: {
            type: String,
        },
        investors: [
            {
                investor: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                }
            }
        ],
        projectImages: {
            type: [String],
            default: []
        },
        totalInvestMoney: {
            type: Number,
        }
    })
)

module.exports = Offer;