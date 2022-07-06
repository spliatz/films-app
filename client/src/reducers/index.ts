import { combineReducers } from '@reduxjs/toolkit';
import { Auth } from './auth.reducer';
import { API } from '../services/ApiService';

export default combineReducers({
    Auth,
    [API.reducerPath]: API.reducer,
});
