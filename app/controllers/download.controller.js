const db = require("../models");
const Investor = db.investor;

exports.downloadImg = (req, res) => {
    // const imgURL = "http://localhost:8080/" + req.file.filename;
    const imgURL = "http://104.131.170.242:8080/" + req.file.filename;

    const id = req.body.id;
    console.log("id: ", id);
    console.log("avatarURL: ", imgURL);
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