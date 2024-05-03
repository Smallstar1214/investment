const express = require('express');
const router = express.Router();
const {getAllInvestors, updateData, deleteInvestorById} = require("../controllers/investor.controller");

router.get("/getAllInvestors", getAllInvestors);
router.post("/updateData", updateData);
router.post("/deleteInvestorById", deleteInvestorById)

module.exports = router;