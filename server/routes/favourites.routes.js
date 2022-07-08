import { Router } from 'express';
const FavouritesRouter = Router();
import userExists from '../middleware/userExists-middleware.js';
import FavouritesController from '../controllers/FavouritesController.js';

FavouritesRouter.get('/', (req, res) => {
    res.status(200);
});

// /api/favourites/    get favourite list by userId
FavouritesRouter.get('/:id', userExists, FavouritesController.getByUserId);

// /api/favourites/    add film by filmId
FavouritesRouter.put('/add/:id', userExists, FavouritesController.addByUserId);

// /api/favourites/    remove film by filmId
FavouritesRouter.put('/remove/:id', userExists, FavouritesController.removeByUserId);

export default FavouritesRouter;
