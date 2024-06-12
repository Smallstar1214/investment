const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'downloads/documents');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let uploadDoc = multer({storage, fileFilter});

module.exports = uploadDoc;