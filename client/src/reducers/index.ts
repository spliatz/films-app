import { combineReducers } from '@reduxjs/toolkit';
import { Auth } from './auth.reducer';
import { Favourites } from './favourite.reducer';
import { WatchLater } from './watchLater.reducer';

export default combineReducers({ Auth, Favourites, WatchLater });
