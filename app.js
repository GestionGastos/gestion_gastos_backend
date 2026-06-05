const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

<<<<<<< Updated upstream:app.js
const userRouter = require('./routes/user');
const budgetRouter = require('./routes/budgeting');
const adminRouter = require('./routes/admin');
=======
const port = process.env.PORT || 8080;

const routes = require('./routes');
>>>>>>> Stashed changes:index.js

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

<<<<<<< Updated upstream:app.js
app.use('/users', userRouter);
app.use('/budget', budgetRouter);
app.use('/admin', adminRouter);
=======
app.use(routes);
>>>>>>> Stashed changes:index.js

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority')
    .then(result => {
        app.listen(80);
    })
    .catch(err => {
        throw new Error(err);
    });
