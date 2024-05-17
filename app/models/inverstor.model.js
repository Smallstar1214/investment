const mongoose = require("mongoose");

const Investor = mongoose.model(
    "Investor",
    new mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type:String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type:String,
            required: true
        },
        category: {
            type: String,
        },
        avatar: {
            type: String,
        },
        summary: {
            type: String,
            default:""
        },
        business: {
            type: [String],
            default: [],
        },
        investSize: {
            type: Number,
            default: 0,
        },
        language: {
            type:[String],
            default:[],
        },
        howSoon: {
            type: Number,
            default: 0
        },
        notes: [{
            companyName: String,
            note: String,
        }],
        role: {
            type:String,
        }
    })
)

module.exports = Investor;