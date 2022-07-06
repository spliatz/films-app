import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/index';
import { FavouriteAPI } from '../services/FavouritesService';
import { WatchLaterAPI } from '../services/WatchLaterService';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(FavouriteAPI.middleware).concat(WatchLaterAPI.middleware),
});

export default store;
