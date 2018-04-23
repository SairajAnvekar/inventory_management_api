const mongoose = require('mongoose');
const mongo = require('mongodb')
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (Customer, Token) => (req, res) => {
  if (Token) {
    Customer.find({}, (error, Customer) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Customer);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (Customer, Token) => (req, res) => {
  if (Token) {
    const customer = new Customer({
      name: req.body.customer.name,
      address: req.body.customer.address,
      email: req.body.customer.emailId,
      telephone_number: req.body.customer.telephoneNumber,
      gstin : req.body.customer.gstinNumber
    });

    customer.save((error, customer)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, Customer: customer });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.update = (Customer, Token) => (req, res) => {

  if (Token) {  
  const customerId = req.params.customerId;
  const customer = {
    name: req.body.customer.name,
    address: req.body.customer.address,
    email: req.body.customer.email,
    telephone_number: req.body.customer.telephone_number,
    gstin : req.body.customer.gstin
  };
   Customer.findOneAndUpdate( { _id : customerId } , customer, (error, Customer) => {
          if (error) res.status(400).json(error);
          res.status(200).json(Customer);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.checkout = (Customer, Token) => (req, res) => {
  if (Token) {
  const emp_id = req.body.emp_id;
   Customer.findOneAndUpdate({ emp_id: emp_id }, {out_time : Date.now()}, (error, Customer) => {
          if (error) res.status(400).json(error);
          
          res.status(200).json(Customer);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.remove = (Customer, Token) => (req, res) => {
    if (Token) {
    const customerId = req.params.customerId;
     Customer.remove({ _id: new ObjectId(customerId) }, (error, Customer) => {
            if (error) res.status(400).json(error);
                res.status(200).json(Customer);
          })   
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }

module.exports = api;
