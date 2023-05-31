const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    order: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    basics: {
        type: Object,
        required: true
    },
    expenses: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    additionals: {
        type: Array,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Budgeting', budgetSchema);