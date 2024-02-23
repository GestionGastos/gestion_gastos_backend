const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const userRouter = require('./routes/user');
const budgetRouter = require('./routes/budgeting');
const adminRouter = require('./routes/admin');

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/users', userRouter);
app.use('/budget', budgetRouter);
app.use('/admin', adminRouter);


//mongoose.connect('mongodb+srv://:'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://santiago:' + process.env.DB_PASSWORD + '@nodecompletecluster.lyvn4hm.mongodb.net/budgeting')
    .then(result => {
        app.listen(8080);
    })
    .catch(err => {
        throw new Error(err);
    });