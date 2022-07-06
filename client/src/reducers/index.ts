import { combineReducers } from '@reduxjs/toolkit';
import { Auth } from './auth.reducer';
import { API } from '../services/ApiService';
import { WatchLaterAPI } from '../services/WatchLaterService';

export default combineReducers({
    Auth,
    [API.reducerPath]: API.reducer,
    //[WatchLaterAPI.reducerPath]: WatchLaterAPI.reducer,
});
