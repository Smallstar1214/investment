const mongoose = require("mongoose");

const Company = mongoose.model(
    "Company",
    new mongoose.Schema({
        companyName: {
            type:String,
        },
        phone: {
            type:String,
        },
        role: {
            type: String,
        },
        password:{
            type:String,
        }
    })
)

module.exports = Company;