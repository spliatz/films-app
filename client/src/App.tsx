import React, { useState, useLayoutEffect } from 'react';
import Header from './components/Header/Header';
import FilmList from './components/Films-List/Film-List';
import Filter from './components/Filter/Filter';
import { Data, dataCheckBox } from './const';
import { Filters, FilterPopularity } from './types';
import { ScreenContext } from './context/ScreenContext';
import { PaginationContext } from './context/PaginationContext';
import { FilterContext } from './context/FilterContext';
import { useScreen } from './hooks/useScreen.hook';
import Burger from './components/Burger/Burger';
import './index.scss';

const App = () => {
  const { isMobile, changeWidth } = useScreen(document.body.clientWidth);
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

  useLayoutEffect(() => {
    function updateSize() {
      changeWidth(document.body.clientWidth);
    }

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  return (
    <ScreenContext.Provider
      value={{
        isMobile: isMobile,
      }}
    >
      <Header />

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
          <div className={isMobile ? 'main mobile' : 'main'}>
            {(!isMobile && <Filter />) || <Burger isOpen={isBurgerOpen} setOpen={setBurgerOpen} />}

            {!isBurgerOpen && <FilmList films={Data} />}
          </div>
        </PaginationContext.Provider>
      </FilterContext.Provider>
    </ScreenContext.Provider>
  );
};

export default App;
