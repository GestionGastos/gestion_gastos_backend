const express = require('express');

const healthCheckRouter = require('../shared/infrastructure/routes/healthCheck');
const budgetRouter = require('../budget/infrastructure/routes/budgeting');
const userRouter = require('../user/infrastructure/routes/user');
const adminRouter = require('../admin/infrastructure/routes/admin');
const goalRouter = require('../goals/infrastructure/routes/goal');

const router = express.Router();

router.use('/healthcheck', healthCheckRouter);
router.use('/users', userRouter);
router.use('/budget', budgetRouter);
router.use('/admin', adminRouter);
router.use('/goal', goalRouter);

module.exports = router;
