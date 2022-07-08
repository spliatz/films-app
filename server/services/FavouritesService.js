import Favourites from '../models/favourites.js';
import Service from '../services/Service.js';

class FavouritesService extends Service {
    async getByUserID(id) {
        let favourites = await Favourites.findOne({ owner: id });
        if (!favourites) {
            favourites = await FavouritesService.crateNewCollectionByUserId(Favourites, id);
            return favourites.list;
        }
        return favourites.list;
    }

    async addByUserId(userId, film) {
        const newFav = await Favourites.findOneAndUpdate(
            { owner: userId },
            { $push: { list: film } },
            { new: true },
        );
        if (!newFav) return new Error();
        return newFav.list;
    }

    async removeByUserId(userId, film) {
        const newFav = await Favourites.findOneAndUpdate(
            { owner: userId },
            { $pull: { list: film } },
            { new: true },
        );
        if (!newFav) return new Error();
        return newFav.list;
    }
}

export default new FavouritesService();
