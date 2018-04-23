const mongoose = require('mongoose');
const mongo = require('mongodb')
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (CompanyProfile, Token) => (req, res) => {
  if (Token) {
    CompanyProfile.find({}, (error, companyProfile) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(companyProfile);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (CompanyProfile, Token) => (req, res) => {
  if (Token) {
    const companyProfile = new CompanyProfile(req.body.profile);
    companyProfile.save((error, companyProfile)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, companyProfile: companyProfile });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (CompanyProfile, Token) => (req, res) => {
  if (Token) {  
   CompanyProfile.findOneAndUpdate({ _id: req.body.profile._id }, req.body.profile, (error, CompanyProfile) => {
          if (error) res.status(400).json(error);
          res.status(200).json(CompanyProfile);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

module.exports = api;
