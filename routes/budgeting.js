const express = require('express');

const budgetingController = require('../controllers/budgeting');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, budgetingController.getBudget);

router.get('/budgets', auth, budgetingController.getBudgets);

router.get('/budget/:id', auth, budgetingController.getBudgetById);

router.post('/create', auth, budgetingController.createBudget);

router.put('/update/:id', auth, budgetingController.updateBudget);

module.exports = router;