const express = require('express');
const router = express.Router();
const {getAllInvestors, updateData, deleteInvestorById, updatePreference, updateSummary} = require("../controllers/investor.controller");

router.get("/getAllInvestors", getAllInvestors);
router.post("/updateData", updateData);
router.post("/deleteInvestorById", deleteInvestorById);
router.post("/updatePreference", updatePreference);
router.post("/updateSummary",updateSummary);

module.exports = router;