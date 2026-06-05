const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);