const express = require('express');
const { Router } = require('express');
const router = Router();
const userExists = require('../middleware/userExists-middleware');
const WatchLater = require('../models/watchLater');
const jsonParser = express.json();

router.get('/', (req, res) => {
    res.status(200);
});

// /api/watch-later/    get watch later list by userId
router.get('/:id', userExists, jsonParser, (req, res) => {
    try {
        WatchLater.findOne({ owner: req.user.id }, (err, warchlater) => {
            if (err) return res.status(401);
            if (warchlater === null) {
                const newWatchLater = new WatchLater({ owner: req.user.id, list: [] });
                newWatchLater.save((err) => {
                    if (err) return console.log(err);
                    res.json(newWatchLater.list);
                });
                console.log('watch later is null');
            } else {
                res.json(warchlater.list);
            }
        });
    } catch (err) {
        return console.log(err);
    }
});

// /api/watch-later/    add film by filmId
router.put('/add/:id', userExists, jsonParser, async (req, res) => {
    if (!req.body) return res.status(400).json({ message: 'Film does not exists' });
    const filmId = req.body.filmId;
    try {
        const newWatchLater = await WatchLater.findOneAndUpdate(
            { owner: req.user.id },
            { $push: { list: filmId } },
            { new: true },
        );
        newWatchLater.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'something going wrong' });
            }
        });
        res.status(200).json(newWatchLater);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Something going wrong' });
    }
});

// /api/watch-later/    remove film by filmId
router.put('/remove/:id', userExists, jsonParser, async (req, res) => {
    if (!req.body) return res.status(400).json({ message: 'Film does not exists' });
    const filmId = req.body.filmId;
    try {
        const newWatchLater = await WatchLater.findOneAndUpdate(
            { owner: req.user.id },
            { $pull: { list: filmId } },
            { new: true },
        );
        newWatchLater.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'something going wrong' });
            }
        });
        res.status(200).json(newWatchLater);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Something going wrong' });
    }
});

module.exports = router;
