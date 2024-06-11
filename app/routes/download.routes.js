const express = require('express');
const router = express.Router();
const {downloadImg, downloadDoc, uploadProductImage, deleteProductImage} = require("../controllers/download.controller");
const uploadImage = require('../middlewares/uploadImage');
const uploadDoc = require('../middlewares/uploadDoc');

router.post("/image", uploadImage.single('file'), downloadImg);
router.post("/document", uploadDoc.single('file'), downloadDoc);
router.post("/uploadProductImage", uploadImage.single('file'), uploadProductImage);
router.post("/deleteProductImage", deleteProductImage);

module.exports = router;