const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephone_number: {
        type: Number,
        required: true
    },
    email: {
        type: Strng,
        required: true
    }
});

mongoose.model('Supplier', Schema);