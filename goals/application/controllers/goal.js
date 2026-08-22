const Goal = require('../../domain/models/goal');


exports.getGoals = async (req, res, next) => {
    try {
        const goals = await Goal.find({creator: req.userId});

        return goals;
    } catch(err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
}

exports.getGoal = async (req, res, next) => {
    try {
        const goal = await Goal.findOne({ _id: req.params.id, creator: req.userId });
        
        if (!goal) {
            return res.status(404).json({ error: 'Not Found', message: 'Budget not found' });
        }

        res.status(200).json({ message: 'success', budget });
    } catch(err) {
        res.status(500).json({ error: 'Internla Server Error', message: errr });
    }
}

exports.createGoal = async (req, res, next) => {
    try {
        const goal = new Goal({ ...req.body, creator: req.userId});
        const result = await goal.save();

        return result;
    } catch(err) {
        res.status(500).json()
    }
}

exports.updateGoal = async (req, res, next) => {
    
}