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
        role: {
            type:String,
        }
    })
)

module.exports = Investor;