//абстрактный класс, чьи методы взаимодействуют с коллекциями favourite и watch-later
class Service {
    static async crateNewCollectionByUserId(model, id) {
        const favourites = new model({ owner: id, list: [] });
        await favourites.save();
        return favourites;
    }
}

export default Service;
