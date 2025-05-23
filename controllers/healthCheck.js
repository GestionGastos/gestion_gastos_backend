exports.health = (req, res, next) => {
    const healthCheck = {
        uptime: process.uptime(),
        responsetime: process.hrtime(),
        message: 'OK',
        timestamp: Date.now()
    }

    try  {
        res.status(200).json(healthCheck);
    } catch(e) {
        healthCheck.message = e,
        res.status(503).json(healthCheck)
    }
};