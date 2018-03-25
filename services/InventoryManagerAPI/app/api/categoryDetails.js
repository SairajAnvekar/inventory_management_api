const mongoose = require('mongoose');
const api = {};

api.getAll = (User, CategoryDetailsDetails, Token) => (req, res) => {
  if (Token) {
    CategoryDetails.find({}, (error, CategoryDetails) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(CategoryDetails);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (User, CategoryDetails, Token) => (req, res) => {
  if (Token) {
    const categoryDetails = new CategoryDetails({
      product_id: req.body.categoryDetails.productId,
      category_id: req.body.categoryDetails.categoryId,
      properties: req.body.categoryDetails.properties
    });

    categoryDetails.save((error, categoryDetails)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, CategoryDetails: categoryDetails });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (User, CategoryDetails, Token) => (req, res) => {
  if (Token) {  
  const emp_id = req.query.emp_id;
   CategoryDetails.findOneAndUpdate({ emp_id: emp_id }, req.body, (error, CategoryDetails) => {
          if (error) res.status(400).json(error);
          res.status(200).json(CategoryDetails);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}



module.exports = api;
