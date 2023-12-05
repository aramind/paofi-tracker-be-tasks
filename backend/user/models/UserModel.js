const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: String,
    email: {type: String, required: true},
    password: {type: String, required: true, select: false},
    name: {
        firstNAme: {type: String, required: true},
        lastName: {type: String, required: true},
    },
    phone: Number,
    address: {},
    academic: {},
    sponsors: Array,
    isDeleted: Boolean,
});

module.exports = mongoose.model( 'User', UserSchema );