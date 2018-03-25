const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    purchase_order_number: {
        type: String,
        required: true
    },
    product_details: [
        {
            product_id: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },   
            purchase_amount: {
                type: number,
                required: true
            }, 
            selling_amount: {
                type: Number,
                required: true
            }, 
            sub_total: {
                type: Number,
                required: true
            },
            batch_number: {
                type: String,
                required: true
            }
        }],
    total_amount: {
        type: Number,
        required: true
    },
    recieved_flag: {
        type: Boolean
    },
    name_of_sales_person: {
        type: String
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