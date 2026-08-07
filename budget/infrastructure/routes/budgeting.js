const express = require('express');
const { body, param } = require('express-validator');

const budgetingController = require('../../application/controllers/budgeting');
const auth = require('../../../middleware/auth');
const validateRequest = require('../../../middleware/validateRequest');

const router = express.Router();

router.get('/', auth, budgetingController.getBudget);

router.get('/budgets', auth, budgetingController.getBudgets);

router.get('/budget/:id', auth, param('id').isMongoId(), validateRequest, budgetingController.getBudgetById);

router.post(
    '/create',
    auth,
    [
        body('order').notEmpty(),
        body('year').notEmpty(),
        body('month').notEmpty(),
        body('basics').isObject(),
        body('expenses').isArray(),
        body('tags').isArray(),
        body('additionals').optional().isArray()
    ],
    validateRequest,
    budgetingController.createBudget
);

router.put(
    '/update/:id',
    auth,
    [
        param('id').isMongoId(),
        body('basics').isObject(),
        body('expenses').isArray(),
        body('tags').isArray(),
        body('additionals').optional().isArray()
    ],
    validateRequest,
    budgetingController.updateBudget
);

module.exports = router;
