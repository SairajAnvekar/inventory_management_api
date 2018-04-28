const mongoose = require('mongoose');
const type = mongoose.Schema;

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value:{
        type : Number,
        require : true
    }
});


mongoose.model('CompanyTax', Schema);