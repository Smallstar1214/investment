const db = require("../models");
const Investor = db.investor;
const Document = db.document;
const Offer = db.offer;

exports.downloadImg = (req, res) => {
    // const imgURL = "http://localhost:8080/images/" + req.file.filename;
    const imgURL = "https://autoinvest.ai/images/" + req.file.filename;

    const id = req.body.id;
    Investor.findOne({_id: id}, (error, investor) => {
        if(error) {
            console.log(error);
        } else {
            investor.avatar = imgURL;
            investor.save((err) => {
                if(err) {
                    console.log(err);
                } else {
                    res.status(200).json({message: "Updated correctly"});
                }
            })
        }
    })
}

exports.uploadProductImage = (req, res) => {
    // const imgURL = "http://localhost:8080/images/" + req.file.filename;
    const imgURL = "https://autoinvest.ai//images/" + req.file.filename;

    const companyName = req.body.companyName;
    Offer.findOneAndUpdate(
        {companyName: companyName},
        {$addToSet: {projectImages: imgURL}},
    )
    .exec((err, updatedOffer) => {
        if(err) {
            return res.status(500).send({message: err});
        }
        Offer.find({companyName: companyName}, (err, offers) => {
            if(err) {
                return res.status(500).send({message: err});
            }

            res.status(200).json({data: offers});
        })
    })
}

exports.deleteProductImage = (req, res) => {
    const url = req.body.imgURL;
    const companyName = req.body.companyName;

    console.log("url = ", req.body.companyName);

    Offer.findOneAndUpdate(
        {projectImages: url},
        {
            $pull: {    
                projectImages: url
            }
        }
    )
    .exec((err, updatedOffer) => {
        if(err) {
            return res.status(500).send({message: err});
        }

        Offer.find({companyName: companyName}, (err, offers) => {
            if(err) {
                return res.status(500).send({message: err});
            }

            res.status(200).json({data: offers});
        })
    })
}

exports.downloadDoc = (req, res) => {
    const fileName = req.file.filename;
    let size;
    let fileType, icons, iconsBg;
    if (fileName.endsWith('.pdf')) {
        icons = "file-pdf-fill";
        iconsBg = "danger";
        fileType = 'pdf';
    } else {
        icons = "file-text-fill";
        iconsBg = "warning";
        fileType = 'document';
    }

    const now = new Date(); // Get current date and time
    const year = now.getFullYear(); // Get the year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Get the month (zero-based index, hence the +1), and pad with '0' if necessary
    const day = String(now.getDate()).padStart(2, '0'); // Get the day of the month and pad with '0' if necessary
    const hours = String(now.getHours()).padStart(2, '0'); // Get the hours and pad with '0' if necessary
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const lastUpdated = `${year}-${month}-${day} ${hours}:${minutes}`;

    if((req.file.size / 1024) > 1000) {
        size = `${(((req.file.size) / 1024) / 1024).toFixed(2)} MB`;
    } else {
        size = `${(req.file.size / 1024).toFixed(2)} KB`;
    }

    const newDoc = new Document({
        companyName : req.body.companyName,
        type : req.body.type,
        document:{
            icons: icons,
            iconBg: iconsBg,
            fileName: fileName,
            fileType: fileType,
        },
        size : size,
        Updated: lastUpdated,
        actions: [{preview:"#"},],
        shareTo: req.body.shareTo,
    })

    newDoc.save((err, savedDoc) => {
        if(err) {
            return res.status(500).send({message: err});
        }
        return res.status(200).send({message: "Saved Successfully"});
    })
}
