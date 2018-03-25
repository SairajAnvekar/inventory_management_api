const mongoose = require('mongoose');
const type = mongoose.Schema;

const Schema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    fields : []
});


mongoose.model('Category', Schema);