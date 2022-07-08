import { Router } from 'express';
const WatchLaterRouter = Router();
import userExists from '../middleware/userExists-middleware.js';
import WatchLaterController from '../controllers/WatchLaterController.js';

WatchLaterRouter.get('/', (req, res) => {
    res.status(200);
});

// /api/watch-later/    get watch later list by userId
WatchLaterRouter.get('/:id', userExists, WatchLaterController.getByUserId);

// /api/watch-later/    add film by filmId
WatchLaterRouter.put('/add/:id', userExists, WatchLaterController.addByUserId);

// /api/watch-later/    remove film by filmId
WatchLaterRouter.put('/remove/:id', userExists, WatchLaterController.removeByUserId);

export default WatchLaterRouter;
