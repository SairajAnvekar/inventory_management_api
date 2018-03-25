const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    }
});


mongoose.model('Product', Schema);