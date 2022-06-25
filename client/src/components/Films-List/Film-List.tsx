import React, { useContext, useEffect } from 'react';
import { Film, Filters } from '../../types';
import { FilterPopularity } from '../../types';
import FilmCard from '../Film-Card/Film-Card';
import { PaginationContext } from '../../context/PaginationContext';
import './Films-List.scss';
import PageSwitcher from '../Pagination/PageSwitcher';
import { ScreenContext } from '../../context/ScreenContext';
import { FilterContext } from '../../context/FilterContext';

interface Props {
  films: Film[];
}

const FilmList: React.FC<Props> = ({ films }) => {
  const { page, setPageCount, setPage } = useContext(PaginationContext);
  const { isMobile } = useContext(ScreenContext);
  const { filters } = useContext(FilterContext);
  const sortedFilms = sortArray(filterArray(films, filters), filters);
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

function filterArray(array: Film[], options: Filters) {
  return array
    .filter((item) => {
      return item.release_date.split('-')[0] === options.sortedByYear;
    })
    .filter((item) => {
      const checked = options.sortedCheckbox
        .filter((item) => {
          return item.checked;
        })
        .map((item) => {
          return item.id;
        });

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
