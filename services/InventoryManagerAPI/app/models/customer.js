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
        type: String,
        default : ""
    },
    email: {
        type: String,
        default : ""
    },
    gstin : {
        type: String,
        default : ""

    },
    pending_amount : {
        type: Number,
        default : 0
    }
});

mongoose.model('Customer', Schema);