const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour']
    },

    is_drink: {
        type: Boolean,
        default: false
    },

    ingredients: {
        type: [String],
        default: []
    },
    
});
const menu = mongoose.model('menu', menuItemSchema);
module.exports = menu;