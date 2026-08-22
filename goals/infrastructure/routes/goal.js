const express = require('express');
const { body, param } = require('express-validator');

const goalController = require('../../application/controllers/goal');
const auth = require('../../../middleware/auth');
const validateRequest = require('../../../middleware/validateRequest');

const router = express.Router();

router.get('/', auth, goalController.getGoals);

router.get('/:id', auth, goalController.getGoal);

router.post(
    '/', 
    auth, 
    [
        body("name").notEmpty(),
        body("type").notEmpty(),
        body("value").notEmpty().isNumeric(),
        body("objective_date").notEmpty().isDate(),
        body("status").notEmpty(),
        body("created_at").notEmpty()
    ],
    validateRequest,
    goalController.createGoal
);

router.put('/:id', auth, goalController.updateGoal);

module.exports = router;