const mongoose = require('mongoose');
const mongo = require('mongodb')
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (Supplier, Token) => (req, res) => {
  if (Token) {
    Supplier.find({}, (error, Supplier) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Supplier);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (Supplier, Token) => (req, res) => {
  if (Token) {
    const supplier = new Supplier({
      name: req.body.supplier.name,
      address: req.body.supplier.address,
      email: req.body.supplier.emailId,
      telephone_number: req.body.supplier.telephoneNumber
    });

    supplier.save((error, supplier)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, Supplier: supplier });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (Supplier, Token) => (req, res) => {
  if (Token) {  
  const emp_id = req.query.emp_id;
   Supplier.findOneAndUpdate({ emp_id: emp_id }, req.body, (error, Supplier) => {
          if (error) res.status(400).json(error);
          res.status(200).json(Supplier);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.checkout = (Supplier, Token) => (req, res) => {
  if (Token) {
  const emp_id = req.body.emp_id;
   Supplier.findOneAndUpdate({ emp_id: emp_id }, {out_time : Date.now()}, (error, Supplier) => {
          if (error) res.status(400).json(error);
          
          res.status(200).json(Supplier);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.remove = (Supplier, Token) => (req, res) => {
    if (Token) {
    const supplierId = req.params.supplierId;
     Supplier.remove({ _id: new ObjectId(supplierId) }, (error, Supplier) => {
            if (error) res.status(400).json(error);
                res.status(200).json(Supplier);
          })   
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }


module.exports = api;
