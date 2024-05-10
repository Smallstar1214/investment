const express = require('express');
const router = express.Router();
const {downloadImg, downloadDoc} = require("../controllers/download.controller");
const uploadImage = require('../middlewares/uploadImage');
const uploadDoc = require('../middlewares/uploadDoc');

router.post("/image", uploadImage.single('file'), downloadImg);
router.post("/document", uploadDoc.single('file'), downloadDoc);

module.exports = router;