const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'downloads/images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now()+path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let uploadImage = multer({storage, fileFilter});

module.exports = uploadImage;