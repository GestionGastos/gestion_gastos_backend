const jwt = require('jsonwebtoken');
const Logged = require('../user/domain/models/login');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Not authenticated'
        });
    }

    const tokenParts = authHeader.split(' ');
    const token = tokenParts.length === 2 && tokenParts[0] === 'Bearer' ? tokenParts[1] : null;

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid authorization header'
        });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'JWT secret is not configured'
        });
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or expired token'
        });
    }

    if (!decodedToken) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Not authenticated'
        });
    }

    Logged.findOne({ token, isLogged: true })
        .then(logged => {
            if (!logged) {
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Session is not active'
                });
            }

            req.userId = decodedToken.userId;
            req.token = token;
            next();
        })
        .catch(err => {
            res.status(500).json({
                error: 'Internal Server Error',
                message: err
            });
        });
};
