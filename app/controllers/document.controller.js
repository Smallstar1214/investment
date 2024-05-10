const db = require("../models");
const Document = db.document;
const Investor = db.investor;

exports.getMyCreatedDocuments = (req, res) => {
    const createdBy = req.query.id;
    Document.find({createdBy: createdBy},(err, docs) => {
        if(err) {
            return res.status(500).send({message: "There is error during fetching my documents"})
        }

        return res.status(200).send({data: docs});
    })
}

exports.getMySharedDocuments = (req, res) => {
    const id = req.query.id;
    console.log("id: ", id);
    Investor.findOne({_id: id},(err, user) => {
        if(err) {
            return res.status(500).send({message: "There is error during fetching my documents"})
        }

        let userName = user?.userName;
        console.log('name: ', userName);

        Document.find(
            { shareTo: userName },
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