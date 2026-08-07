const express = require('express');
const { body } = require('express-validator');

const adminController = require('../../application/controllers/admin');
const auth = require('../../../middleware/auth');
const isAdmin = require('../../../middleware/isAdmin');
const validateRequest = require('../../../middleware/validateRequest');

const router = express.Router();

router.use(auth, isAdmin);

router.get('/users', adminController.getUsers);

router.put('/users/enable', body('id').isMongoId(), validateRequest, adminController.enableUser);

router.delete('/users/delete', body('id').isMongoId(), validateRequest, adminController.deleteUser);

router.get('/mails', adminController.getMails);

router.delete('/mails/delete', body('id').isMongoId(), validateRequest, adminController.deleteMail);

module.exports = router;
