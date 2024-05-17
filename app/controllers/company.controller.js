const db = require("../models");
const Company = db.company;


exports.getAllCompanies = (req, res) => {
    Company.find({}, (err, companies) => {
        if(err){
            return res.status(500).send({message: "There is error during fetching all Companies"})
        }

        const companyNames = companies.map(company => company.companyName);
        return res.status(200).send({data: companyNames});
    })
}