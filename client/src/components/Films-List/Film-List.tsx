import React, { useContext, useEffect } from 'react';
import { Film, Filters, IStore, FilterPopularity } from '../../types';

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

  const favourites = useSelector((state: IStore) => state.Favourites);
  const watchLater = useSelector((state: IStore) => state.WatchLater);

  const sortedFilms = sortArray(filterArray(films, filters, favourites, watchLater), filters);
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
          })) || <div className="films-empty-error">Фильмов с указанными фильтрами нет :(</div>}
      </div>
    </>
  );
};

function filterArray(array: Film[], options: Filters, favourites: number[], watchLater: number[]) {
  const favouriteID = 0;
  const watchLaterID = 1;

  let checked = options.sortedCheckbox // массив выбранных фильтров
    .filter((item) => {
      return item.checked;
    })
    .map((item) => {
      return item.id;
    });

  if (checked.includes(favouriteID) && checked.includes(watchLaterID)) {
    array = array.filter((item) => favourites.includes(item.id) || watchLater.includes(item.id));
  } else if (checked.includes(favouriteID)) {
    array = array.filter((item) => favourites.includes(item.id));
  } else if (checked.includes(watchLaterID)) {
    array = array.filter((item) => watchLater.includes(item.id));
  }

  checked = checked.filter((item) => item !== favouriteID && item !== watchLaterID); /* удалить
  фильтры favourite и watchLater */

  return array
    .filter((item) => {
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

function sortArray(array: Film[], options: Filters) {
  return array.sort((a, b) => {
    if (options.sortedByPopularity === FilterPopularity.PopularityAscending) {
      return a.popularity - b.popularity;
    }
    if (options.sortedByPopularity === FilterPopularity.RateDescending) {
      return b.vote_average - a.vote_average;
    }
    if (options.sortedByPopularity === FilterPopularity.RateAscending) {
      return a.vote_average - b.vote_average;
    }
    return b.popularity - a.popularity;
  });
}

export default FilmList;
