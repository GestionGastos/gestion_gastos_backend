const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;

const healthCheckRouter = require('./routes/healthCheck');
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

app.use('/healthcheck', healthCheckRouter);
app.use('/users', userRouter);
app.use('/budget', budgetRouter);
app.use('/admin', adminRouter);

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST
} = process.env

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
    .then(result => {
        app.listen(port);
    })
    .catch(err => {
        throw new Error(err);
    });