const mongoose = require('mongoose');
const mongo = require('mongodb')
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (User, Product, Token) => (req, res) => {
  if (Token) {
    Product.find({}, (error, Product) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Product);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.getAllWithCategory = (Category, Product, Token) => (req, res) => {
    if (Token) {   
      Product.find({}, (error, Product) => {
        if (error) return res.status(400).json(error);
        var searchIds= [];
        var products = {};
       
        Product.forEach(function(obj){
            searchIds.push( new ObjectId(obj.category_id));
        });
        Category.find({"_id" : { "$in" : searchIds }}, (error, Category) => {
            if (error) return res.status(400).json(error);
            
            var newProduct = [];
            var index = 0;
            Product.forEach(function(pobj){
                newProduct.push(JSON.parse(JSON.stringify(pobj)));
                Category.forEach(function(cobj){
                    if(mongo.ObjectID(pobj.category_id).toString() === mongo.ObjectID(cobj._id).toString()){
                        newProduct[index].categoryName = cobj.name;
                    }
                });
                index++;
            });
            res.status(200).json(newProduct);
            return true;
        });
      })
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }

api.getAllWithStock = (Stock, Product, Token) => (req, res) => {
  if (Token) {   
    Product.find({}, (error, Product) => {
      if (error) return res.status(400).json(error);
      var searchIds= [];
      var products = {};
     
      Product.forEach(function(obj){
          searchIds.push( new ObjectId(obj._id));
      });
      Stock.find({"product_id" : { "$in" : searchIds }}, (error, Stock) => {
          if (error) return res.status(400).json(error);
          
          var newProduct = [];
          var index = 0;
            Stock.forEach(function(sobj){
                Product.forEach(function(pobj){
               
                  if(mongo.ObjectID(pobj._id).toString() === mongo.ObjectID(sobj.product_id).toString()){
                      newProduct.push(JSON.parse(JSON.stringify(pobj)));
                      newProduct[index].batch_number = sobj.batch_number;
                      newProduct[index].quantity = sobj.quantity;
                      newProduct[index].selling_price = sobj.selling_price;
                      newProduct[index].purchase_price = sobj.purchase_price;
                      newProduct[index].date = sobj.date;
                      newProduct[index].stockId = sobj._id;
                      index++;
                  }
                  
              });
              
          });
          res.status(200).json(newProduct);
          return true;
      });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
} 
api.store = (User, Product, Token) => (req, res) => {
  if (Token) {
    const product = new Product({
      name: req.body.product.name,
      description: req.body.product.description,
      category_id: req.body.product.category_id
    });

    console.log(req.body)
    product.save((error, product)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, Product: product });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (User, Product, Token) => (req, res) => {
  if (Token) {  
  const emp_id = req.query.emp_id;
   Product.findOneAndUpdate({ emp_id: emp_id }, req.body, (error, Product) => {
          if (error) res.status(400).json(error);
          res.status(200).json(Product);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.checkout = (User, Product, Token) => (req, res) => {
  if (Token) {
  const emp_id = req.body.emp_id;
   Product.findOneAndUpdate({ emp_id: emp_id }, {out_time : Date.now()}, (error, Product) => {
          if (error) res.status(400).json(error);
          
          res.status(200).json(Product);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.remove = (CategoryDetails, Product, Token) => (req, res) => {
    if (Token) {
    const prodId = req.params.prodId;
     Product.remove({ _id: new ObjectId(prodId) }, (error, Product) => {
            if (error) res.status(400).json(error);
          
            CategoryDetails.remove({ product_id: prodId }, (error, Product) => {
                if (error) res.status(400).json(error);

                res.status(200).json(Product);
            });
          })   
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }


module.exports = api;
