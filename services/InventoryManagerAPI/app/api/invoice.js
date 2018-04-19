const mongoose = require('mongoose');
const mongo = require('mongodb');
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (User, Invoice, Token) => (req, res) => {
  if (Token) {
    Invoice.find({}, (error, Invoice) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Invoice);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.getWithSupplier = (Supplier, Invoice, Token) => (req, res) => {
    if (Token) {
        Invoice.find({}, (error, Invoice) => {
            if (error) return res.status(400).json(error);
            var searchIds= [];
           
            Invoice.forEach(function(obj){
                searchIds.push( new ObjectId(obj.supplier_id));
            });
            Supplier.find({"_id" : { "$in" : searchIds }}, (error, Supplier) => {
                if (error) return res.status(400).json(error);
                
                var newInvoice = [];
                var index = 0;
                Invoice.forEach(function(pobj){
                    newInvoice.push(JSON.parse(JSON.stringify(pobj)));
                    Supplier.forEach(function(cobj){
                        if(mongo.ObjectID(pobj.supplier_id).toString() === mongo.ObjectID(cobj._id).toString()){
                            newInvoice[index].supplierName = cobj.name;
                        }
                    });
                    index++;
                });
                res.status(200).json(newInvoice);
                return true;
            });
      })
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (Stock, Invoice, Token) => (req, res) => {
  if (Token) {
    const invoice = new Invoice({
        invoice_number : req.body.invoice.invoiceNumber,
        total_amount: req.body.invoice.totalAmount,
        name_of_sales_person: req.body.invoice.salesPersonId,
        customer_id: req.body.invoice.customerId,
        date_of_sale: req.body.invoice.dateOfSale,
        invoice_details : req.body.invoice.items,
        subCategories:req.body.invoice.subCategories,
        is_gst : req.body.invoice.isGST
    });

    invoice.save((error, invoice)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, Invoice: invoice });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (User, Invoice, Token) => (req, res) => {
  if (Token) {  
  const porderId = req.params.porderId;
  Invoice.findOneAndUpdate({ _id: porderId }, req.body.invoice, (error, Invoice) => {
          if (error) res.status(400).json(error);
          res.status(200).json(Invoice);
    })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}



module.exports = api;
