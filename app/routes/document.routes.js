const express = require('express');
const router = express.Router();
const {getMyCreatedDocuments, deleteOneDocument, shareDocument, getMySharedDocuments, getAllDocumnets} = require("../controllers/document.controller");

router.get("/getMyDocuments", getMyCreatedDocuments);
router.post("/deleteOneDocument", deleteOneDocument);
router.post("/shareDocument", shareDocument);
router.get("/getMySharedDocuments", getMySharedDocuments);
router.get("/getAllDocumnets", getAllDocumnets);

module.exports = router;