const express = require('express');
const router = express.Router();
const {
    getAllInvestors, 
    updateData, 
    deleteInvestorById, 
    updatePreference, 
    updateSummary,
    updateNotes,
    // getNotesForCompany, 
    // getAllNotes
} = require("../controllers/investor.controller");

router.get("/getAllInvestors", getAllInvestors);
router.post("/updateData", updateData);
router.post("/deleteInvestorById", deleteInvestorById);
router.post("/updatePreference", updatePreference);
router.post("/updateSummary",updateSummary);
router.post("/updateNotes", updateNotes);
// router.post("/getNotesForCompany", getNotesForCompany);
// router.post("/getAllNotes", getAllNotes);

module.exports = router;