const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loggedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isLogged: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Logged', loggedSchema);