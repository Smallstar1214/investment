const mongoose = require("mongoose");

const Company = mongoose.model(
    "Company",
    new mongoose.Schema({
        companyName: {
            type:String,
            required: true
        },
        phone: {
            type:String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        password:{
            type:String,
            required: true
        }
    })
)

module.exports = Company;