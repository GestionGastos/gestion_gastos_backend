const express = require('express');
const { body } = require('express-validator');

const userController = require('../../application/controllers/user');
const auth = require('../../../middleware/auth');
const validateRequest = require('../../../middleware/validateRequest');

const router = express.Router();

router.post(
    '/signup',
    [
        body('name').trim().notEmpty(),
        body('lastname').trim().notEmpty(),
        body('username').trim().notEmpty(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 })
    ],
    validateRequest,
    userController.signup
);

router.post(
    '/login',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty()
    ],
    validateRequest,
    userController.login
);

router.post('/logout', auth, userController.logout);

router.put(
    '/update_user',
    auth,
    [
        body('name').trim().notEmpty(),
        body('lastname').trim().notEmpty(),
        body('username').trim().notEmpty(),
        body('email').isEmail().normalizeEmail()
    ],
    validateRequest,
    userController.updateUser
);

router.put(
    '/update_password',
    auth,
    [
        body('currentPassword').notEmpty(),
        body('newPassword').isLength({ min: 8 })
    ],
    validateRequest,
    userController.updatePassword
);

router.put('/setup', auth, userController.setup);

router.delete('/delete', auth, userController.delete);

router.post(
    '/send',
    [
        body('email').isEmail().normalizeEmail(),
        body('subject').trim().notEmpty(),
        body('message').trim().notEmpty()
    ],
    validateRequest,
    userController.send
);

module.exports = router;
