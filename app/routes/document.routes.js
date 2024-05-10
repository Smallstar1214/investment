const express = require('express');
const router = express.Router();
const {getMyCreatedDocuments, deleteOneDocument, shareDocument, getMySharedDocuments} = require("../controllers/document.controller");

router.get("/getMyDocuments", getMyCreatedDocuments);
router.post("/deleteOneDocument", deleteOneDocument);
router.post("/shareDocument", shareDocument);
router.get("/getMySharedDocuments", getMySharedDocuments);

module.exports = router;