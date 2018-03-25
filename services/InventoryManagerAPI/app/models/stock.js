const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    batch_number: {
        type: String,
        required: true
    },
    purchase_price: {
        type: Number,
        required: true
    },
    selling_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        timestamps: true,
        default: Date.now
    }
});


mongoose.model('Stock', Schema);