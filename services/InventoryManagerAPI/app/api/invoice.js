const mongoose = require('mongoose');
const mongo = require('mongodb');
const api = {};
const async = require('async');
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

api.getCustomerInvoices =  (Customer, Invoice, Token) => (req, res) => {
  if (Token) {
    var reqBody = {customer_id : req.params.custId};
    if(req.query.isPending){
      reqBody.isPending = req.query.isPending;
    }

    Invoice.find(reqBody, (error, Invoice) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Invoice);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.getWithAll = (Customer,User, Invoice, Token) => (req, res) => {
  if (Token) {
      Invoice.find({}, (error, Invoice) => {
          if (error) return res.status(400).json(error);
          var searchIds= [],userSearchIds = [];
         
          Invoice.forEach(function(obj){
              searchIds.push( new ObjectId(obj.customer_id));
              userSearchIds.push(new ObjectId(obj.name_of_sales_person))
          });
          Customer.find({"_id" : { "$in" : searchIds }}, (error, Customer) => {
              if (error) return res.status(400).json(error);
              
              User.find({"_id" : { "$in" : userSearchIds }}, (error, User) => {
                if (error) return res.status(400).json(error); 
                  var newInvoice = [];
                  var index = 0;
                  Invoice.forEach(function(pobj){
                      newInvoice.push(JSON.parse(JSON.stringify(pobj)));
                      Customer.forEach(function(cobj){
                          if(mongo.ObjectID(pobj.customer_id).toString() === mongo.ObjectID(cobj._id).toString()){
                              newInvoice[index].customerName = cobj.name;
                          }
                      });
                      User.forEach(function(cobj){
                        if(mongo.ObjectID(pobj.name_of_sales_person).toString() === mongo.ObjectID(cobj._id).toString()){
                            newInvoice[index].salesPersonName = cobj.username;
                        }
                      });
                      index++;
                  });
                  res.status(200).json(newInvoice);
                  return true;
            });
          });
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

api.store = (Customer, Invoice, Token) => (req, res) => {
  if (Token) {
    var pendingAmount = 0;
    var reqBody = {
      invoice_number : req.body.invoice.invoiceNumber,
      total_amount: req.body.invoice.totalAmount,
      name_of_sales_person: req.body.invoice.salesPersonId,
      customer_id: req.body.invoice.customerId,
      date_of_sale: req.body.invoice.dateOfSale,
      invoice_details : req.body.invoice.items,
      subCategories:req.body.invoice.subCategories,
      is_gst : req.body.invoice.isGST
    }
    if(req.body.invoice.isGST){
      reqBody.taxList = req.body.invoice.taxList
    }
    if(req.body.invoice.isPending){
      reqBody.isPending = req.body.invoice.isPending;
      reqBody.paidAmount = req.body.invoice.paidAmount;
      pendingAmount = req.body.invoice.totalAmount - req.body.invoice.paidAmount;
    }
    const invoice = new Invoice(reqBody);

    invoice.save((error, invoice)  => {
      if (error) return res.status(400).json(error);
      console.log(req.body.invoice.isPending)
      if(req.body.invoice.isPending){
        Customer.findOneAndUpdate({ _id: req.body.invoice.customerId },{ $inc : { pending_amount : pendingAmount}}, (error, customer) => {
          if (error) res.status(400).json(error);

          res.status(200).json({ success: true, Invoice: invoice,Customer : customer });
        }) 
      }else{
        res.status(200).json({ success: true, Invoice: invoice });
      }
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (User, Invoice, Token) => (req, res) => {
  if (Token) {  
  const invoiceId = req.params.invoiceId;
  Invoice.findOneAndUpdate({ _id: invoiceId }, req.body.invoice, (error, Invoice) => {
          if (error) res.status(400).json(error);
          res.status(200).json(Invoice);
    })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.updateStatus = (Customer, Invoice, Token) => (req, res) => {
  if (Token) {  
  var paidAmount = (req.body.invoice.totalAmount - req.body.invoice.paidAmount) * -1;
  const invoiceId = req.params.invoiceId;
  Invoice.findOneAndUpdate({ _id: invoiceId }, { "isPending" : req.body.invoice.isPending}, (error, invoice) => {
      if (error) res.status(400).json(error);
        
       Customer.findOneAndUpdate({ _id: req.body.invoice.customerId },{ $inc : { pending_amount : paidAmount}}, (error, customer) => {
            if (error) res.status(400).json(error);
            res.status(200).json({ success: true, Invoice: invoice,Customer : customer });
        }) 
    })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}


api.updateStatusCustomer = (Customer, Invoice, Token) => (req, res) => {
  if (Token) {  
  var myresponse = [];
  const custId = req.params.custId;
  Invoice.find({ customer_id: custId ,isPending : true },(error, invoice) => {
      if (error) res.status(400).json(error);
        async.each(invoice,function(item,callback){
          Invoice.findOneAndUpdate({ _id: item._id }, req.body.invoice, (error, resInvoice) => {
            if (error) return callback(error);
            myresponse.push(resInvoice)
            callback(null,myresponse);
          });
        },function(err,response){
          console.log(myresponse)
          if (err) return res.status(400).json(err);
          
          Customer.findOneAndUpdate({ _id: custId },{ $set : { pending_amount : 0}}, (error, customer) => {
            if (error) res.status(400).json(error);
            res.status(200).json({ success: true, Invoice: myresponse,Customer : customer });
          }) 
      })
    })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}


module.exports = api;
