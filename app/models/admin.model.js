const mongoose = require("mongoose");

const Admin = mongoose.model(
    "Admin",
    new mongoose.Schema({
        userName: {
            type:String,
        },
        email: {
            type:String,
        },
        password:{
            type:String,
        }
    })
)

module.exports = Admin;