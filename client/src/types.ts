export interface ActionAuth {
    type: string;
    payload?: string;
}

export interface ActionFavoriteAndWatchLater {
    type: string;
    payload: number;
}

export interface IStore {
    Auth: IAuth;
    Favourites: number[];
    WatchLater: number[];
}

interface IAuth {
    isAuth: boolean;
    token: string;
}

export interface Film {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface FilterCheckBox {
    id: number;
    name: string;
    checked: boolean;
}

export interface Filters {
    sortedByPopularity: string;
    sortedByYear: string;
    sortedCheckbox: FilterCheckBox[];
    userFilters: string;
}

export enum FilterPopularity {
    PopularityAscending = 'PopularityAscending',
    PopularityDescending = 'PopularityDescending',
    RateAscending = 'RateAscending',
    RateDescending = 'RateDescending',
}

export enum UserFilter {
    DEFAULT = 'DEFAULT',
    FAVOURITE = 'FAVOURITE',
    WATCH_LATER = 'WATCH_LATER',
}

export interface ISearchForm {
    rate: null | string;
    popularity: null | string;
    genre: null | number;
}

export enum RateEnum {
    HIGH = 'HIGH',
    LOW = 'LOW',
}

export enum PopularityEnum {
    HIGH = 'HIGH',
    LOW = 'LOW',
}
