const mongoose = require('mongoose');

const AccessSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    access_level: String,
});

module.exports = mongoose.model( 'Access', AccessSchema );