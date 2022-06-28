import { ActionFavoriteAndWatchLater } from '../types';

enum FavouritesEnum {
  ADD_FAVOURITE_FILM = 'ADD_FAVOURITE_FILM',
  REMOVE_FAVORITE_FILM = 'REMOVE_FAVORITE_FILM',
}

const initial = () => {
  return JSON.parse(localStorage.getItem('favoritesFilm') as string);
};

export const Favourites = (
  state: number[] = initial() || [],
  action: ActionFavoriteAndWatchLater,
) => {
  switch (action.type) {
    case FavouritesEnum.ADD_FAVOURITE_FILM:
      const responseAdd = [...state, action.payload];
      localStorage.setItem('favoritesFilm', JSON.stringify(responseAdd));
      return responseAdd;
    case FavouritesEnum.REMOVE_FAVORITE_FILM:
      const responseRemove = state.filter((x) => x !== action.payload);
      localStorage.setItem('favoritesFilm', JSON.stringify(responseRemove));
      return responseRemove;
    default:
      return state;
  }
};

export const ActionFavouriteAdd = (payload: number) => ({
  type: FavouritesEnum.ADD_FAVOURITE_FILM,
  payload,
});

export const ActionFavouriteRemove = (payload: number) => ({
  type: FavouritesEnum.REMOVE_FAVORITE_FILM,
  payload,
});
