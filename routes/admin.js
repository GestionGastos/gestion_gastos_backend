const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/users', adminController.getUsers);

router.get('/mails', adminController.getMails);

module.exports = router;