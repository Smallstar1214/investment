const express = require('express');
const router = express.Router();
const {
    createNewOffer,
    getCompanyOffers,
    getAllOffers,
    updateDealTerms,
    updateInvest,
    deleteOfferById
} = require("../controllers/offer.controller");

router.post("/createNewOffer", createNewOffer);
router.post("/getCompanyOffers", getCompanyOffers);
router.get("/getAllOffers", getAllOffers);
router.post("/updateDealTerms", updateDealTerms);
router.post("/updateInvest", updateInvest);
router.post("/deleteOfferById", deleteOfferById);

module.exports = router;