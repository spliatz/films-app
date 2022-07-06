const User = require('../models/user');

module.exports = (req, res, next) => {
    const id = req.params.id;
    try {
        User.findById(id, (err, user) => {
            if (err) return res.status(400).json({ error: 'User is not defined' });
            req.user = user;
            next();
        });
    } catch (err) {
        return console.log(err);
    }
};
