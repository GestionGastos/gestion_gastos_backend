const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseTypeSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        require: true
    },
    creator : {
        type: Schema.Types.ObjectId,
        require: false
    }
});

module.exports = mongoose.model('ExpenseType', expenseTypeSchema);