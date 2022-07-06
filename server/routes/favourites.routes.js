const express = require('express');
const { Router } = require('express');
const router = Router();
const userExists = require('../middleware/userExists-middleware');
const Favourites = require('../models/favourites');
const jsonParser = express.json();

router.get('/', (req, res) => {
    res.status(200);
});

// /api/favourites/    get favourite list by userId
router.get('/:id', userExists, jsonParser, (req, res) => {
    try {
        Favourites.findOne({ owner: req.user.id }, (err, fav) => {
            if (err) return res.status(401);
            if (fav === null) {
                const favourite = new Favourites({ owner: req.user.id, list: [] });
                favourite.save((err) => {
                    if (err) return console.log(err);
                    res.json(favourite.list);
                });
            } else {
                res.json(fav.list);
            }
        });
    } catch (err) {
        return console.log(err);
    }
});

// /api/favourites/    add film by filmId
router.put('/add/:id', userExists, jsonParser, async (req, res) => {
    if (!req.body) return res.status(400).json({ message: 'Film does not exists' });
    const filmId = req.body.filmId;
    try {
        const newFav = await Favourites.findOneAndUpdate(
            { owner: req.user.id },
            { $push: { list: filmId } },
            { new: true },
        );
        newFav.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'something going wrong' });
            }
        });
        res.status(200).json(newFav);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Something going wrong' });
    }
});

// /api/favourites/    remove film by filmId
router.put('/remove/:id', userExists, jsonParser, async (req, res) => {
    if (!req.body) return res.status(400).json({ message: 'Film does not exists' });
    const filmId = req.body.filmId;
    try {
        const newFav = await Favourites.findOneAndUpdate(
            { owner: req.user.id },
            { $pull: { list: filmId } },
            { new: true },
        );
        newFav.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'something going wrong' });
            }
        });
        res.status(200).json(newFav);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Something going wrong' });
    }
});

module.exports = router;
