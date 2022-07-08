import WatchLaterService from '../services/WatchLaterService.js';

class WatchLaterController {
    async getByUserId(req, res) {
        const result = await WatchLaterService.getByUserID(req.params.id);
        if (!result) return res.status(500);
        return res.json(result);
    }

    async addByUserId(req, res) {
        if (!req.body) return res.status(400).json({ message: 'Film does not exists' });
        const { filmId } = req.body;
        if (!filmId) return res.status(400).json({ message: 'Film does not exists' });
        try {
            const result = await WatchLaterService.addByUserId(req.params.id, filmId);
            return res.json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    async removeByUserId(req, res) {
        if (!req.body) return res.status(400).json({ message: 'Film does not exists' });
        const { filmId } = req.body;
        if (!filmId) return res.status(400).json({ message: 'Film does not exists' });
        try {
            const result = await WatchLaterService.removeByUserId(req.params.id, filmId);
            return res.json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

export default new WatchLaterController();
