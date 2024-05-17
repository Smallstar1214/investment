const express = require('express');
const router = express.Router();

const {getAllCompanies} = require("../controllers/company.controller");

router.get("/getAllCompanies", getAllCompanies);

module.exports = router;