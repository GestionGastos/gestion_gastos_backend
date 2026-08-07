const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: 'Validation Error',
            message: 'Invalid request data',
            errors: errors.array()
        });
    }

    next();
};
