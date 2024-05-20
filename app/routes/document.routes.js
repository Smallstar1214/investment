const express = require('express');
const router = express.Router();
const {getMyCreatedDocuments, deleteOneDocument, shareDocument, getMySharedDocuments, getAllPublicDocumnets} = require("../controllers/document.controller");

router.get("/getMyDocuments", getMyCreatedDocuments);
router.post("/deleteOneDocument", deleteOneDocument);
router.post("/shareDocument", shareDocument);
router.get("/getMySharedDocuments", getMySharedDocuments);
router.get("/getAllPublicDocumnets", getAllPublicDocumnets);

module.exports = router;