const User = require('../../../user/domain/models/user');
const Mail = require('../../../shared/domain/models/email');

const toUserResponse = user => ({
    _id: user._id,
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    admin: user.admin,
    deleted: user.deleted
});

exports.getUsers = async (req, res, next) => {
    try {
        const results = await User.find({ admin: false }).select('-password');

        res.status(200).json({ message: 'success', result: results });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};

exports.enableUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);

        if (!user) {
            return res.status(404).json({ error: 'Not Found', message: 'User not found' });
        }

        user.deleted = false;
        const result = await user.save();

        res.status(200).json({ message: 'success', user: toUserResponse(result) });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);

        if (!user) {
            return res.status(404).json({ error: 'Not Found', message: 'User not found' });
        }

        user.deleted = true;
        const result = await user.save();

        res.status(200).json({ message: 'success', user: toUserResponse(result) });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};

exports.getMails = async (req, res, next) => {
    try {
        const results = await Mail.find();

        res.status(200).json({ message: 'success', result: results });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};

exports.deleteMail = async (req, res, next) => {
    try {
        await Mail.findOneAndRemove({ _id: req.body.id });

        res.status(200).json({ message: 'success' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err });
    }
};
