const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    product_details: [],
    total_amount: {
        type: Number,
        required: true
    },
    recieved_flag: {
        type: Boolean
    },
    supplier_id : {
        type: String,
        required: true 
    },
    date_of_order: {
        type: Date,
        timestamps: true,
        default: Date.now
    },
    date_recieved: {
        type: Date,
        timestamps: true,
        default: Date.now
    }
});


mongoose.model('PurchaseOrder', Schema);