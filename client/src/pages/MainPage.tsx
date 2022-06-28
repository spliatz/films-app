import React, { useContext, useState } from 'react';

import Burger from '../components/Burger/Burger';
import Filter from '../components/Filter/Filter';
import FilmList from '../components/Films-List/Film-List';

import { FilterContext } from '../context/FilterContext';
import { PaginationContext } from '../context/PaginationContext';
import { ScreenContext } from '../context/ScreenContext';

import { FilterPopularity, Filters } from '../types';
import { Data, dataCheckBox } from '../const';
import { AuthPopupContext } from '../context/AuthPopup';

const MainPage = () => {
  const { isMobile } = useContext(ScreenContext);
  const { isOpen } = useContext(AuthPopupContext)
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    sortedByPopularity: FilterPopularity.PopularityDescending,
    sortedByYear: '2020',
    sortedCheckbox: dataCheckBox,
  });

  const switchPage = (page: number) => {
    setPage(page);
  };

  const changePageCount = (pages: number) => {
    setPageCount(pages);
  };

  const sortByPopularity = (value: string) => {
    const object = filters;
    object.sortedByPopularity = value;
    setFilters({ ...object });
  };

  const sortByYear = (value: string) => {
    const object = filters;
    object.sortedByYear = value;
    setFilters({ ...object });
  };

  const resetFilters = () => {
    const object = filters;
    object.sortedByPopularity = FilterPopularity.PopularityDescending;
    object.sortedByYear = '2020';
    object.sortedCheckbox.map((item) => {
      item.checked = false;
    });
    setFilters({ ...object });
  };

  const sortByCheckBox = (id: number) => {
    const object = filters;
    object.sortedCheckbox.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setFilters({ ...object });
  };

  return (
    <FilterContext.Provider
      value={{
        filters: filters,
        sortByPopularity: sortByPopularity,
        sortByYear: sortByYear,
        sortByCheckbox: sortByCheckBox,
        reset: resetFilters,
      }}
    >
      <PaginationContext.Provider
        value={{
          page: page,
          setPage: switchPage,
          pageCount: pageCount,
          setPageCount: changePageCount,
        }}
      >
        <div className={isMobile ? 'main mobile' : 'main'} style={{userSelect: isOpen ? 'none' : 'inherit'}}>
          {(!isMobile && <Filter />) || <Burger isOpen={isBurgerOpen} setOpen={setBurgerOpen} />}

          {!isBurgerOpen && <FilmList films={Data} />}
        </div>
      </PaginationContext.Provider>
    </FilterContext.Provider>
  );
};

export default MainPage;
