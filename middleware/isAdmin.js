const User = require('../user/domain/models/user');

module.exports = (req, res, next) => {
    User.findById(req.userId)
        .then(user => {
            if (!user || user.deleted || !user.admin) {
                return res.status(403).json({
                    error: 'Forbidden',
                    message: 'Admin permissions required'
                });
            }

            next();
        })
        .catch(err => {
            res.status(500).json({
                error: 'Internal Server Error',
                message: err
            });
        });
};
