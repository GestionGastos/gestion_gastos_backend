const express = require('express');

const adminController = require('../controllers/admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/users', auth, adminController.getUsers);

router.put('/users/enable', auth, adminController.enableUser);

router.delete('/users/delete', auth, adminController.deleteUser);

router.get('/mails', auth, adminController.getMails);

router.delete('/mails/delete', auth, adminController.deleteMail);

module.exports = router;