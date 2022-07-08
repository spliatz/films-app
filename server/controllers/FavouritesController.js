import FavouritesService from '../services/FavouritesService.js';

class FavouritesController {
    async getByUserId(req, res) {
        const { id } = req.params;
        const result = await FavouritesService.getByUserID(id);
        if (!result) return res.status(500);
        return res.json(result);
    }

    async addByUserId(req, res) {
        if (!req.body) return res.status(400).json({ message: 'Film does not exists' });
        const { filmId } = req.body;
        if (!filmId) return res.status(400).json({ message: 'Film does not exists' });
        try {
            const result = await FavouritesService.addByUserId(req.params.id, filmId);
            if (!result) return res.status(500);
            return res.json(result);
        } catch (err) {
            return res.status(500);
        }
    }

    async removeByUserId(req, res) {
        if (!req.body) return res.status(400).json({ message: 'Film does not exists' });
        const { filmId } = req.body;
        if (!filmId) return res.status(400).json({ message: 'Film does not exists' });
        try {
            const result = await FavouritesService.removeByUserId(req.params.id, filmId);
            if (!result) return res.status(500);
            return res.json(result);
        } catch (err) {
            return res.status(500);
        }
    }
}

export default new FavouritesController();
