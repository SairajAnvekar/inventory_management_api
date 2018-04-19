const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    display_name: {
        type: String,
        required: true
    },
    address:String,
    name: {
        type: String,
        required: true
    },
    gstin: {
        type: String
    },
    tin: {
        type: String
    },
    phone: {
        type: String
    },
    logo : {
        type: String,      
    },
    branch: {
            name: {
                type: String,
                required: true
            },
            number: {
                type: Number,
                required: true
            },   
            is_head: {
                type: Boolean,
                required: true
            }, 
            dc_number: {
                type: Number,
                required: true
            }, 
            dc_date: {
                type: Date,
                timestamps: true
            },
            address:String,
        }
});


mongoose.model('CompanyProfile', Schema);