const express = require("express");
const  { body, param } = require("express-validator");

const expenseTypeController = require("../../application/controllers/expenseType");
const auth = require('../../../middleware/auth');
const isAdmin = require('../../../middleware/isAdmin');
const validateRequest = require('../../../middleware/validateRequest');

const router = express.Router();

router.get("/", auth, expenseTypeController.getExpenseTypes);

router.get("/:id", auth, expenseTypeController.getExpenseType);

router.post(
    '/',
    auth,
    isAdmin, 
    [
        body('name').notEmpty(),
        body('status').notEmpty(),
        body('created_at').notEmpty()
    ],
    validateRequest,
    expenseTypeController.createExpenseType
);

module.exports = router;
