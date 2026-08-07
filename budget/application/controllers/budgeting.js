const Budget = require('../../domain/models/budgeting');
const User = require('../../../user/domain/models/user');

const _es_months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

exports.getBudget = async (req, res, next) => {
    try {
        const date = new Date();
        const year = date.getFullYear();
        const month = _es_months[date.getMonth()];
        const budget = await Budget.find({ creator: req.userId, year, month });

        res.status(200).json({ message: 'success', budget });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};

exports.getBudgets = async (req, res, next) => {
    try {
        const date = new Date();
        const year = date.getFullYear();
        const budgets = await Budget.find({ creator: req.userId, year }).sort({ order: 'asc' });
        const user = await User.findById(req.userId).select('-password');

        res.status(200).json({ message: 'success', budgets, user });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};

exports.getBudgetById = async (req, res, next) => {
    try {
        const budget = await Budget.findOne({ _id: req.params.id, creator: req.userId });

        if (!budget) {
            return res.status(404).json({ error: 'Not Found', message: 'Budget not found' });
        }

        res.status(200).json({ message: 'success', budget });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};

exports.createBudget = async (req, res, next) => {
    try {
        const budget = new Budget({ ...req.body, creator: req.userId });
        const result = await budget.save();

        res.status(201).json({ message: 'success', budget: result });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};

exports.updateBudget = async (req, res, next) => {
    try {
        const budget = await Budget.findOne({ _id: req.params.id, creator: req.userId });

        if (!budget) {
            return res.status(404).json({ error: 'Not Found', message: 'Budget not found' });
        }

        budget.basics = req.body.basics;
        budget.expenses = req.body.expenses;
        budget.tags = req.body.tags;

        if (req.body.additionals) {
            budget.additionals = req.body.additionals;
        }

        const result = await budget.save();

        res.status(200).json({ message: 'success', budget: result });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};
