import React, { useContext, useEffect } from 'react';
import { Film, IStore } from '../../types';
import { sortArray, filterArray } from './utils';

import { useAuth } from '../../hooks/auth.hook';

import FilmCard from '../Film-Card/Film-Card';
import PageSwitcher from '../Pagination/PageSwitcher';

import { PaginationContext } from '../../context/PaginationContext';
import { ScreenContext } from '../../context/ScreenContext';
import { FilterContext } from '../../context/FilterContext';

import { useSelector } from 'react-redux';
import './Films-List.scss';

interface Props {
    films: Film[];
}

const FilmList: React.FC<Props> = ({ films }) => {
    const { page, setPageCount, setPage } = useContext(PaginationContext);
    const { isMobile } = useContext(ScreenContext);
    const { filters } = useContext(FilterContext);

    const { isAuth } = useAuth();

    const favourites = useSelector((state: IStore) => state.Favourites);
    const watchLater = useSelector((state: IStore) => state.WatchLater);

    const sortedFilms = sortArray(
        filterArray(films, filters, favourites, watchLater, isAuth),
        filters,
    );

    const filmsOnPage = sortedFilms.slice(10 * page - 10, 10 * page);

    useEffect(() => {
        setPageCount(Math.ceil(sortedFilms.length / 10));
        setPage(1);
    }, [filters]);

    return (
        <>
            {isMobile && <PageSwitcher />}

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
