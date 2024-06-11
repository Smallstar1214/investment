const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// db.role = require("./role.model");
db.investor = require("./inverstor.model");
db.admin = require("./admin.model");
db.document = require("./document.model");
db.company = require("./company.model");
db.offer = require("./offer.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;