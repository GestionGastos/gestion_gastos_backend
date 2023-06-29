const User = require('../models/user');
const Mail = require('../models/email');

exports.getUsers = (req, res, next) => {
    User.find({ admin: false })
        .then(results => {
            res.status(200).json({ message: 'success', result: results });
        })
        .catch(err => {
            res.status(400).json({ error: 'Internal Server Error', message: err });
        });
};

exports.enableUser = (req, res, next) => {
    const id = req.body.id;

    User.findById(id)
        .then(user => {
            user.deleted = false;

            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'success', result: result});
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error', message: err});
        });
};

exports.deleteUser = (req, res, next) => {
    const id = req.body.id;

    User.findById(id)
        .then(user => {
            user.deleted = true;
            
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'success', result: result});
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error', message: err});
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

exports.deleteMail = (req, res, next) => {
    const id = req.body.id;

    Mail.findOneAndRemove({ _id: id })
        .then(result => {
            res.status(200).json({ message: 'success' });
        })
        .catch(err => {
            res.status(400).json({ error: 'Internal Server Error', message: err });
        });
};