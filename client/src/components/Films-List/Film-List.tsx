import React, { useContext, useEffect } from 'react';
import { Film } from '../../types';
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
  const { page, setPageCount, switchPage } = useContext(PaginationContext);
  const { isMobile } = useContext(ScreenContext);
  const { filters } = useContext(FilterContext);
  const sortedFilms = films
    .sort((a, b) => {
      if (filters.sortedByPopularity === 'PopularityAscending') {
        return a.popularity - b.popularity;
      }
      if (filters.sortedByPopularity === 'RateDescending') {
        return b.vote_average - a.vote_average;
      }
      if (filters.sortedByPopularity === 'RateAscending') {
        return a.vote_average - b.vote_average;
      }
      return b.popularity - a.popularity;
    })
    .filter((item) => {
      return item.release_date.split('-')[0] === filters.sortedByYear;
    });

  const filmsOnPage = sortedFilms.slice(10 * page - 10, 10 * page);

  useEffect(() => {
    setPageCount(Math.ceil(sortedFilms.length / 10));
    switchPage(1);
  }, [filters]);

  return (
    <>
      {isMobile && <PageSwitcher />}

      <div className="film-list-wrapper">
        {filmsOnPage.map((item, index) => {
          return <FilmCard key={item.id + index} {...item} />;
        })}
      </div>
    </>
  );
};

export default FilmList;
