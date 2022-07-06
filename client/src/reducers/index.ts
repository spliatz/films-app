import { combineReducers } from '@reduxjs/toolkit';
import { Auth } from './auth.reducer';
import { FavouriteAPI } from '../services/FavouritesService';
import { WatchLaterAPI } from '../services/WatchLaterService';

export default combineReducers({
    Auth,
    [FavouriteAPI.reducerPath]: FavouriteAPI.reducer,
    [WatchLaterAPI.reducerPath]: WatchLaterAPI.reducer,
});
