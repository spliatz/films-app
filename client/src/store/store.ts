import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/index';
import { API } from '../services/ApiService';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
});

export default store;
