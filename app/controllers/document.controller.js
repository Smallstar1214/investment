const db = require("../models");
const Document = db.document;
const Investor = db.investor;

exports.getMyCreatedDocuments = (req, res) => {
    const companyName = req.query.company;
    Document.find({companyName: companyName},(err, docs) => {
        if(err) {
            return res.status(500).send({message: "There is error during fetching my documents"})
        }

        return res.status(200).send({data: docs});
    })
}

exports.getAllPublicDocumnets = (req, res) => {
    Document.find(
        {type: "Public"},
        (err, docs) => {
            if(err) {
                return res.status(500).send({message: err});
            }

            res.status(200).json({data: docs});
        }
    )
}

exports.getMySharedDocuments = (req, res) => {
    const id = req.query.id;
    console.log("id: ", id);
    Investor.findOne({_id: id},(err, user) => {
        if(err) {
            return res.status(500).send({message: "There is error during fetching my documents"})
        }

        let userEmail = user && user.email;

        Document.find(
            { type: "Confidential", shareTo: userEmail },
            (err, docs) => {
                if(err){
                    return res.status(500).send({message: "There is error during fetching my documents"})
                }

                return res.status(200).send({data: docs});
            }
        )
    })
}

exports.deleteOneDocument = (req, res) => {
    const {docId} = req.body;
    Document.findOneAndDelete({
        _id: docId
    })
    .exec((err, user) => {
        if(err) {
            return res.status(500).send({message: err});
        }
        return res.status(200).send({message: "Success"});
    })    
}

exports.shareDocument = (req, res) => {
    const {selectedId, shareUserName} = req.body;
    Document.findOneAndUpdate(
        { _id: selectedId },
        { $addToSet: { shareTo: shareUserName } },
    )
    .exec((err, updatedUser) => {
        if(err) {
            return res.status(500).send({message: err});
        }
        return res.status(200).send({message: "Success"});
    })    
}