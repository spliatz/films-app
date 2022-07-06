import React, { useContext, useEffect } from 'react';
import { Film } from '../../types';
import { sortArray, filterArray } from './utils';
import { useAuth } from '../../hooks/auth.hook';
import FilmCard from '../Film-Card/Film-Card';
import PageSwitcher from '../Filter/Pagination/PageSwitcher';
import { ScreenContext } from '../../context/ScreenContext';
import { FilterContext } from '../../context/FilterContext';
import { FavouriteAPI } from '../../services/FavouritesService';
import { WatchLaterAPI } from '../../services/WatchLaterService';

import './Films-List.scss';

interface Props {
    films: Film[];
    page: number;
    setPage: (n: number) => void;
    updateCount: (n: number) => void;
    totalPages: number;
}

const FilmList: React.FC<Props> = ({ films, page, setPage, totalPages, updateCount }) => {
    const { isMobile } = useContext(ScreenContext);
    const { filters } = useContext(FilterContext);

    const { isAuth, token } = useAuth();

    const { data: favourites } = FavouriteAPI.useFetchUserFavouritesQuery(token);
    const { data: watchLater } = WatchLaterAPI.useFetchUserWatchLaterQuery(token);

    const sortedFilms = sortArray(
        filterArray(films, filters, favourites, watchLater, isAuth),
        filters,
    );

    const filmsOnPage = sortedFilms.slice(10 * page - 10, 10 * page);

    useEffect(() => {
        updateCount(sortedFilms.length);
        setPage(1);
    }, [filters]);

    return (
        <>
            {isMobile && <PageSwitcher page={page} setPage={setPage} totalPages={totalPages} />}

            <div className="film-list-wrapper">
                {(filmsOnPage.length > 0 &&
                    filmsOnPage.map((item, index) => {
                        return <FilmCard key={item.id + index} {...item} />;
                    })) || (
                    <div className="films-empty-error">Фильмов с указанными фильтрами нет :(</div>
                )}
            </div>
        </>
    );
};

export default FilmList;
