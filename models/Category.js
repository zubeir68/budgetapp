const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    max: {
        type: Number,
        required: true,
        default: 0
    },
    amount: {
        type: Number,
        default: 0
    }
})

const Category = mongoose.model('Category', CategorySchema);

module.exports =  Category;