const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    invoice_number: {
        type: String,
        required: true
    },
    invoice_details: [],
    total_amount: {
        type: Number,
        required: true
    },
    is_gst: {
        type: Boolean,
        default : false
    },
    name_of_sales_person: {
        type: String
    },
    notes: {
        type: String
    },
    customer_id : {
        type: String,
        required: true 
    },
    date_of_sale: {
        type: Date,
        timestamps: true,
        default: Date.now
    },
    profit: {
        type: Number
    }
});


mongoose.model('Invoice', Schema);