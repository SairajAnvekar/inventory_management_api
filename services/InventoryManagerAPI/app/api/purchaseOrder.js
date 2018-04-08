const mongoose = require('mongoose');
const mongo = require('mongodb');
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (User, PurchaseOrder, Token) => (req, res) => {
  if (Token) {
    PurchaseOrder.find({}, (error, PurchaseOrder) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(PurchaseOrder);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.getWithSupplier = (Supplier, PurchaseOrder, Token) => (req, res) => {
    if (Token) {
        PurchaseOrder.find({}, (error, PurchaseOrder) => {
            if (error) return res.status(400).json(error);
            var searchIds= [];
           
            PurchaseOrder.forEach(function(obj){
                searchIds.push( new ObjectId(obj.supplier_id));
            });
            Supplier.find({"_id" : { "$in" : searchIds }}, (error, Supplier) => {
                if (error) return res.status(400).json(error);
                
                var newPurchaseOrder = [];
                var index = 0;
                PurchaseOrder.forEach(function(pobj){
                    newPurchaseOrder.push(JSON.parse(JSON.stringify(pobj)));
                    Supplier.forEach(function(cobj){
                        if(mongo.ObjectID(pobj.supplier_id).toString() === mongo.ObjectID(cobj._id).toString()){
                            newPurchaseOrder[index].supplierName = cobj.name;
                        }
                    });
                    index++;
                });
                res.status(200).json(newPurchaseOrder);
                return true;
            });
      })
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (Stock, PurchaseOrder, Token) => (req, res) => {
  if (Token) {
    const purchaseOrder = new PurchaseOrder({
        total_amount: req.body.stock.totalAmount,
        recieved_flag: req.body.stock.stockRecieved,
        supplier_id: req.body.stock.supplierId,
        date_of_order: req.body.stock.dateOrder,
        date_recieved: req.body.stock.dateDelivery,
        product_details : req.body.stock.items
    });

    purchaseOrder.save((error, purchaseOrder)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, PurchaseOrder: purchaseOrder });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (User, PurchaseOrder, Token) => (req, res) => {
  if (Token) {  
  const porderId = req.params.porderId;
  PurchaseOrder.findOneAndUpdate({ _id: porderId }, req.body.stock, (error, PurchaseOrder) => {
          if (error) res.status(400).json(error);
          res.status(200).json(PurchaseOrder);
    })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}



module.exports = api;
