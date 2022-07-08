import WatchLater from '../models/watchLater.js';
import Service from './Service.js';

class WatchLaterService extends Service {
    async getByUserID(id) {
        if (!id) new Error();
        let favourites = await WatchLater.findOne({ owner: id });
        if (!favourites) {
            favourites = await WatchLaterService.crateNewCollectionByUserId(WatchLater, id);
            return favourites.list;
        }
        return favourites.list;
    }

    async addByUserId(userId, film) {
        const newFav = await WatchLater.findOneAndUpdate(
            { owner: userId },
            { $push: { list: film } },
            { new: true },
        );
        if (!newFav) return new Error('something going wrong');
        return newFav.list;
    }

    async removeByUserId(userId, film) {
        const newFav = await WatchLater.findOneAndUpdate(
            { owner: userId },
            { $pull: { list: film } },
            { new: true },
        );
        if (!newFav) return new Error('something going wrong');
        return newFav.list;
    }
}

export default new WatchLaterService();
