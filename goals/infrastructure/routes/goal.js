const express = require('express');
const { body, param } = require('express-validator');

const goalController = require('../../application/controllers/goal');
const auth = require('../../../middleware/auth');
const validateRequest = require('../../../middleware/validateRequest');

const router = express.Router();

router.get('/', auth, goalController.getGoals);

router.get('/:id', auth, goalController.getGoal);

router.post('/', auth, goalController.createGoal);

router.put('/:id', auth, goalController.updateGoal);

module.exports = router;