const express = require('express');
const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jsonParser = express.json();

// /api/auth/    create user
router.post('/register', jsonParser, async (req, res) => {
    if (!req.body) return res.status(400).json({ error: 'Заполните все поля!' });
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    try {
        const isExist = await User.findOne({ email: userEmail });
        if (!!isExist) return res.status(401).send({ message: 'User already exists' });
    } catch (err) {
        return console.log(err);
    }

    try {
        const encryptedPassword = await bcrypt.hash(userPassword, 12);

        const user = new User({ email: userEmail, password: encryptedPassword });
        user.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: 'Возникла ошибка' });
            }
            res.status(201).json({ token: user.id });
        });
    } catch (err) {
        return console.log(err);
    }
});

// /api/auth/    user login
router.post('/login', jsonParser, async (req, res) => {
    if (!req.body) return res.status(400).json({ error: 'Заполните все поля!' });
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(400).json({ message: 'email or password is incorrect' });

        const isMatch = await bcrypt.compare(userPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'email or password is incorrect' });
        }

        res.status(201).json({ token: user.id });
    } catch (err) {
        return console.log(err);
    }
});

module.exports = router;
