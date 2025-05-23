const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendgrid = require('@sendgrid/mail');
require('dotenv').config();

const User = require('../models/user');
const Logged = require('../models/login');
const Mail = require('../models/email');

let userInfo = {};

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res.status(400).json({error: "Bad Request", message: "User already exists"})
            }

            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    user = new User({
                        name: req.body.name,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword,
                        deleted: false,
                        admin: false
                    });
        
                    return user.save();
                })
                .then(result => {
                    res.status(200).json({message: 'User created', result});
                })
                .catch(err => {
                    res.status(500).json({error: 'Internal Server Error', message: "Error while the user was creating", err});
                });
        })
    
};

exports.login = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   
   User.findOne({email: email})
    .then(user => {
        if (user) {
            if (user.deleted === true) {
                return res.status(400).json({ error: "Bad Request", message: "User Deleted" });
            }
            userInfo = {
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                admin: user.admin
            };
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        return res.status(400).json({error: "Bad Request", message: 'Invalid Password'});
                    }
            
                    const token = jwt.sign({
                        email: userInfo.email,
                        userId: userInfo._id.toString()
                    }, 'somesupersecret');
            
                    const logged = new Logged({
                        user: userInfo._id,
                        isLogged: true,
                        token
                    });
            
                    return logged.save();
                })
                .then(response => {
                    res.status(200).json({ message: 'success', token: response.token, user: userInfo });
                });
        } else {
            res.status(400).json({error: 'Bad Request', message: "Invalid Password"});
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    });
};

exports.logout = (req, res, next) => {
    const token = req.body.token;

    Logged.findOne({ token: token})
        .then(log => {
            return Logged.findOneAndRemove({ _id: log._id });
        })
        .then(result => {
            res.status(200).json({ message: 'success', token: '', isLogged: false });
        })
        .catch(err => {
            res.status(500).json({ error: "Internal Server Error", message: err });
        });  
};

exports.updateUser = (req, res, next) => {
    User.findById(req.userId)
        .then(user => {
            user.name = req.body.name;
            user.lastname = req.body.lastname;
            user.username = req.body.username;
            user.email = req.body.email;

            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'success', user: result });
        })
        .catch(err => {
            res.status(500).json({ error: "Internal Server Error", message: err });
        });
};

exports.updatePassword = (req, res, next) => {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    let userInfo = {};

    User.findById(req.userId)
        .then(user => {
            userInfo = user;
            return bcrypt.compare(currentPassword, user.password);
        })
        .then(match => {
            if (!match) {
                return res.status(400).json({ error: 'Bad Request', message: 'Invalid Password' });
            }

            bcrypt.hash(newPassword, 12)
                .then(hashedPassword => {
                    userInfo.password = hashedPassword;

                    return userInfo.save();
                })
                .then(result => {
                    res.status(200).json({ message: 'success', result: result });
                })
                .catch(err => {
                    res.status(500).json({ error: "Internal Server Error", message: "Error al encriptar la contraseña" });
                });
        })
        .catch(err => {
            res.status(500).json({ error: "Internal Server Error", message: "Error al comparar la contraseña" });
        });
};

exports.setup = (req, res, next) => {};

exports.delete = (req, res, next) => {
    User.findById(req.userId)
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

exports.send = (req, res, next) => {
    const to = 'gestion.control.gastos@gmail.com';
    const from = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    mail = new Mail({
        to,
        from,
        subject,
        message
    });

    mail.save()
        .then(result => {
            res.status(200).json({ message: 'success', result: result});
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error', message: err});
        });
};