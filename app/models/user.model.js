const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email : {
      type: String,
      required: true,
      unique: true
    },    
    password: {
      type: String,
      required: true
    }
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Role"
    //   }
    // ]
  })
);

module.exports = User;
