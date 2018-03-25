const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    properties: [{}]
});


mongoose.model('CategoryDetails', Schema);