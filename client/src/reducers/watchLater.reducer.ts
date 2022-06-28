import { ActionFavoriteAndWatchLater } from '../types';

enum WatchLaterEnum {
  ADD_WATCH_LATER_FILM = 'ADD_WATCH_LATER_FILM',
  REMOVE_WATCH_LATER_FILM = 'REMOVE_WATCH_LATER_FILM',
}

const initial = () => {
  return JSON.parse(localStorage.getItem('watchLaterFilms') as string);
};

export const WatchLater = (
  state: number[] = initial() || [],
  action: ActionFavoriteAndWatchLater,
) => {
  switch (action.type) {
    case WatchLaterEnum.ADD_WATCH_LATER_FILM:
      const responseAdd = [...state, action.payload];
      localStorage.setItem('watchLaterFilms', JSON.stringify(responseAdd));
      return responseAdd;
    case WatchLaterEnum.REMOVE_WATCH_LATER_FILM:
      const responseRemove = state.filter((x) => x !== action.payload);
      localStorage.setItem('watchLaterFilms', JSON.stringify(responseRemove));
      return responseRemove;
    default:
      return state;
  }
};

export const ActionWatchLaterAdd = (payload: number) => ({
  type: WatchLaterEnum.ADD_WATCH_LATER_FILM,
  payload,
});

export const ActionWatchLaterRemove = (payload: number) => ({
  type: WatchLaterEnum.REMOVE_WATCH_LATER_FILM,
  payload,
});
