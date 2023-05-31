const express = require('express');

const userController = require('../controllers/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', userController.health);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.put('/update_user', auth, userController.updateUser);

router.put('/update_password', auth, userController.updatePassword);

router.put('/setup', auth, userController.setup);

router.delete('/delete', auth, userController.delete);

router.post('/send', userController.send);

module.exports = router;