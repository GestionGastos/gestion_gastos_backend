const Budget = require('../models/budgeting');
const User = require('../models/user');

const _en_months = [
    'January',
    'Febrary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

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

exports.getBudget = (req, res, next) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = _es_months[date.getMonth()];
    Budget.find({ creator: req.userId, year, month })
        .then(result => {
            res.status(200).json({ message: "success", budget: result});
        })
        .catch(err => {
            res.status(500).json({ error: "Internal Server Error", message: err });
        });
};

exports.getBudgets = (req, res, next) => {
    let budgetsInfo = {};
    
    const date = new Date();
    const year = date.getFullYear();
    Budget.find({creator: req.userId, year })
    .sort({order: 'asc'})
        .then(budgets => {
            budgetsInfo = budgets;
            return User.find({ _id: req.userId });
        })
        .then(user => {
            res.status(200).json({ message: 'success', budgets: budgetsInfo, user });
        })
        .catch(err => {
            res.status(500).json({ error: "Internal Server Error", message: err });
        });
};

exports.getBudgetById = (req, res, next) => {
    Budget.findById(req.params.id)
        .then(result => {
            res.status(200).json({ message: 'success', budget: result});
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error', message: err });
        });
};

exports.createBudget = (req, res, next) => {
    /*year = req.body.basics.year;
    month = req.body.basics.month;
    Budget.find({ month, year})
        .then(result => {
            if (result) {
                res.status(422).json({ error: "Bad Request", message: 'Budget already exists'});
            } else {*/
                budget = new Budget({ ...req.body, creator: req.userId });

                budget.save()
                    .then(result => {
                        res.status(200).json({ message: "success", budget: result });
                    });
            /*}
        })
        .catch(err => {
            res.status(500).json({ error: "Internal Server Error", message: err });
        });*/
};

exports.updateBudget = (req, res, next) => {
    Budget.findById(req.params.id)
        .then(budget => {
            if (!budget) {
                res.status(422).json({ error: "Bad Request", message: "Budget not found"});
            } else {
                budget.basics = req.body.basics;
                budget.expenses = req.body.expenses;
                budget.tags = req.body.tags;

                if (req.body.additionals) {
                    budget.additionals = req.body.additionals;
                }

                return budget.save();
            }
        })
        .then(result => {
            res.status(200).json({ message: "success", budget: result});
        })
        .catch(err => {
            res.status(500).json({ error: "Internal Server Error", message: err });
        });
} 