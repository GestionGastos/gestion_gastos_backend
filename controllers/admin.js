const User = require('../models/user');
const Mail = require('../models/email');

exports.getUsers = (req, res, next) => {
    User.find()
        .then(results => {
            res.status(200).json({ message: 'success', result: results });
        })
        .catch(err => {
            res.status(400).json({ error: 'Internal Server Error', message: err });
        });
};

exports.getMails = (req, res, next) => {
    Mail.find()
        .then(results => {
            res.status(200).json({ message: 'success', result: results });
        })
        .catch(err => {
            res.status(400).json({ error: 'Internal Server Error', message: err });
        });
};