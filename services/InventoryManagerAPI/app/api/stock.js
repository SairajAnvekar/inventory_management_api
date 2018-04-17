const mongoose = require('mongoose');
const mongo = require('mongodb');
const async = require('async');
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (User, Stock, Token) => (req, res) => {
  if (Token) {
    Stock.find({}, (error, Stock) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Stock);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.getAllWithProduct = (Product, Stock, Token) => (req, res) => {
    if (Token) {   
      Stock.find({}, (error, Stock) => {
        if (error) return res.status(400).json(error);
        var searchIds= [];
        var stocks = {};
       
        Stock.forEach(function(obj){
            searchIds.push( new ObjectId(obj.product_id));
        });
        Product.find({"_id" : { "$in" : searchIds }}, (error, Product) => {
            if (error) return res.status(400).json(error);
            
            var newStock = [];
            var index = 0;
            Stock.forEach(function(pobj){
                newStock.push(JSON.parse(JSON.stringify(pobj)));
                Product.forEach(function(cobj){
                    if(mongo.ObjectID(pobj.product_id).toString() === mongo.ObjectID(cobj._id).toString()){
                        newStock[index].productName = cobj.name;
                    }
                });
                index++;
            });
            res.status(200).json(newStock);
            return true;
        });
      })
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }

api.store = (User, Stock, Token) => (req, res) => {
  if (Token) {
    const stock = new Stock({
        product_id: req.body.stock.name,
        quantity: req.body.stock.description,
        purchase_amount: req.body.stock.category_id,
        selling_amount: req.body.stock.category_id,
        batch_number: req.body.stock.category_id
    });

    stock.save((error, stock)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, Stock: stock });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.saveAll =  (User, Stock, Token) => (req, res) => {
    if (Token) {
        var myresponse = [];
        async.each(req.body.stock.items,function(item,callback){
            console.log(item)
            const stock = new Stock({
                product_id: item.productId,
                quantity: item.quantity,
                purchase_price: item.purchasePrice,
                selling_price: item.sellingPrice,
                batch_number: item.batchNumber
            });
        
            stock.save((error, stock)  => {
              if (error) return callback(error);
              myresponse.push(stock)
              callback(null,myresponse);
            })
                    
        },function(err,response){
            console.log(err)
            console.log(myresponse)
            if (err) return res.status(400).json(err);
            res.status(200).json({ success: true, Stock: myresponse });
        })

    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (User, Stock, Token) => (req, res) => {
  if (Token) {  
  
        var myresponse = [];
        async.each(req.body.stock,function(item,callback){
            console.log(item)
            var stockId = item.stockId;
            var batchNumber = item.batch_number;
            var stock = new Stock({
                _id : item.stockId,
                quantity: item.quantity,
                batch_number : item.batch_number,
                purchase_price : item.purchase_price,
                selling_price : item.selling_price,
                date : item.date,
                product_id : item._id
            });

            Stock.findOneAndUpdate({ _id : stockId}, stock, (error, Stock) => {
              if (error) return callback(error);
              myresponse.push(stock)
              callback(null,myresponse);
            })  
                    
        },function(err,response){
            console.log(err)
            console.log(myresponse)
            if (err) return res.status(400).json(err);
            res.status(200).json({ success: true, Stock: myresponse });
        })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.checkout = (User, Stock, Token) => (req, res) => {
  if (Token) {
  const emp_id = req.body.emp_id;
   Stock.findOneAndUpdate({ emp_id: emp_id }, {out_time : Date.now()}, (error, Stock) => {
          if (error) res.status(400).json(error);
          
          res.status(200).json(Stock);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.remove = (CategoryDetails, Stock, Token) => (req, res) => {
    if (Token) {
    const prodId = req.params.prodId;
     Stock.remove({ _id: new ObjectId(prodId) }, (error, Stock) => {
            if (error) res.status(400).json(error);
          
            CategoryDetails.remove({ stock_id: prodId }, (error, Stock) => {
                if (error) res.status(400).json(error);

                res.status(200).json(Stock);
            });
          })   
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }


module.exports = api;
