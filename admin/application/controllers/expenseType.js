const ExpenseType = require('../../domain/models/expenseTypes');

exports.getExpenseTypes = async (req, res, next) => {
    try {
        const expenseTypes =  await ExpenseType.find({ status: 'active' }).sort({ order: 'asc'});

        res.status(200).json({ message: 'success', expenseTypes });
    }catch (err){
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
}

exports.getExpenseType = async (req, res, next) => {
    try {
        const expenseType = await ExpenseType.findOne({ _id: req.params.id });

        res.status(200).json({ message: 'success', expenseType });
    } catch(err) {
        res.status(500).json({ error: "Internal Server Error", message: err });
    }
}

exports.createExpenseType = async (req, res, nex) => {
    try {
        const expenseType = new ExpenseType({ ...req.body, creator: req.userId});
        const result = await expenseType.save();

        res.status(201).json({ message: "success", expenseType: result });
    } catch(err) {
        res.status(500).json({ error: "Internal Server Error", message: err });
    }
}