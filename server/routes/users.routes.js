const { Router } = require('express');
const User = require('../models/user');
const router = Router();

// api/users/    get all users
router.get('/', async (req, res) => {
    const result = await User.find();
    if (!result) return res.sendStatus(401);
    res.send(result);
});

// api/users/    get user by id
router.get('/:id', (req, res) => {
    try {
        User.findById(req.params.id, (err, user) => {
            if (err) return res.status(400).json({ error: 'User is not defined' });
            res.send(user);
        });
    } catch (err) {
        return console.log(err);
    }
});

module.exports = router;
