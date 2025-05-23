const express = require('express');
const healthCheckController = require('../controllers/healthCheck');

const router = express.Router();

router.get('/', healthCheckController.health);

module.exports = router;