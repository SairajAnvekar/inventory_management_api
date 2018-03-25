const mongoose = require('mongoose');
const mongo = require('mongodb')
const api = {};
var ObjectId = mongo.ObjectID;
api.getAll = (User, Category, Token) => (req, res) => {
  if (Token) {
    Category.find({}, (error, Category) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Category);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (User, Category, Token) => (req, res) => {
  if (Token) {
    const category = new Category({
      name: req.body.category.name,
      fields : req.body.category.fields
    });

    category.save((error, category)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, Category: category });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.remove = (User, Category, Token) => (req, res) => {
    if (Token) {  
    const categoryId = req.params.categoryId;
    Category.remove({ _id: new ObjectId(categoryId) }, (error, Category) => {
            if (error) res.status(400).json(error);
            res.status(200).json(Category);
          })   
    } else return res.status(403).send({ success: false, message: 'Unauthorized' });
  }

api.edit = (User, Category, Token) => (req, res) => {
  if (Token) {  
  const emp_id = req.query.emp_id;
   Category.findOneAndUpdate({ emp_id: emp_id }, req.body, (error, Category) => {
          if (error) res.status(400).json(error);
          res.status(200).json(Category);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}



module.exports = api;
