import { Film, FilterPopularity, Filters, UserFilter } from '../../types';
import { defaultRelease } from '../../const';

export function filterArray(
    array: Film[],
    options: Filters,
    favourites: number[],
    watchLater: number[],
    isAuth: boolean,
) {
    const checked = options.sortedCheckbox // массив выбранных фильтров
        .filter((item) => {
            return item.checked;
        })
        .map((item) => {
            return item.id;
        });

    return array
        .filter((item) => {
            if (options.userFilters === UserFilter.DEFAULT || !isAuth) return true;
            if (options.userFilters === UserFilter.FAVOURITE) {
                return favourites.includes(item.id);
            }
            if (options.userFilters === UserFilter.WATCH_LATER) {
                return watchLater.includes(item.id);
            }
        })
        .filter((item) => {
            if (options.sortedByYear === defaultRelease) return true;
            return item.release_date.split('-')[0] === options.sortedByYear;
        })
        .filter((item) => {
            if (checked.length > 0) {
                const matches = checked.map((id) => {
                    return item.genre_ids.includes(id);
                });
                return matches.includes(true);
            }
            return true;
        });
}

export function sortArray(array: Film[], options: Filters) {
    return array.sort((a, b) => {
        switch (options.sortedByPopularity) {
            case FilterPopularity.PopularityAscending:
                return a.popularity - b.popularity;
            case FilterPopularity.RateDescending:
                return b.vote_average - a.vote_average;
            case FilterPopularity.RateAscending:
                return a.vote_average - b.vote_average;
            default:
                return b.popularity - a.popularity;
        }
    });
}
