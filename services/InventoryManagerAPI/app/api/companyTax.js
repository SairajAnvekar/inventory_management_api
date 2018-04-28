const mongoose = require('mongoose');
const mongo = require('mongodb')
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (User, CompanyTax, Token) => (req, res) => {
  if (Token) {
    CompanyTax.find({}, (error, CompanyTax) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(CompanyTax);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (User, CompanyTax, Token) => (req, res) => {
  if (Token) {
    const companyTax = new CompanyTax({
      name: req.body.companyTax.name,
      value : req.body.companyTax.value
    });

    companyTax.save((error, companyTax)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, CompanyTax: companyTax });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.remove = (User, CompanyTax, Token) => (req, res) => {
    if (Token) {  
    const companyTaxId = req.params.companyTaxId;
    CompanyTax.remove({ _id: new ObjectId(companyTaxId) }, (error, CompanyTax) => {
            if (error) res.status(400).json(error);
            res.status(200).json(CompanyTax);
          })   
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }

api.edit = (User, CompanyTax, Token) => (req, res) => {
  if (Token) {  
  const emp_id = req.query.emp_id;
   CompanyTax.findOneAndUpdate({ emp_id: emp_id }, req.body, (error, CompanyTax) => {
          if (error) res.status(400).json(error);
          res.status(200).json(CompanyTax);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}



module.exports = api;
