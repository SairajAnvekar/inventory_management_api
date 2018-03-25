const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    display_name: {
        type: String,
        required: true
    },
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
    logo : {
        type: Blob,
        required: true 
    },
    Branch: [
        {
            name: {
                type: String,
                required: true
            },
            number: {
                type: Number,
                required: true
            },   
            is_head: {
                type: boolean,
                required: true
            }, 
            dc_number: {
                type: Number,
                required: true
            }, 
            dc_date: {
                type: Date,
                timestamps: true
            }
        }]
});


mongoose.model('CompanyProfile', Schema);