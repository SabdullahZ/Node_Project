const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    contact: {
        type: Number,
        required: true
    },

    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager']
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String,
    },

    salary: {
        type: Number,
        required: true
    }
});

const person = mongoose.model('person', personSchema);
module.exports = person;
