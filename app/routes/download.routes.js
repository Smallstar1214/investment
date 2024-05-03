const express = require('express');
const router = express.Router();
const {downloadImg} = require("../controllers/download.controller");
const upload = require('../middlewares/download');

router.post("/image", upload.single('img'), downloadImg);

module.exports = router;