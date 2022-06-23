import React, { useState, useLayoutEffect } from 'react';
import Header from './components/Header/Header';
import FilmList from './components/Films-List/Film-List';
import Filter from './components/Filter/Filter';
import { Data } from './const';
import { Film } from './types';
import { ScreenContext } from './context/ScreenContext';
import { PaginationContext } from './context/PaginationContext';
import { useScreen } from './hooks/useScreen.hook';
import Burger from './components/Burger/Burger';
import './index.scss';

const App = () => {
  const [films, setFilms] = useState<Film[]>(Data);
  const { isMobile, changeWidth } = useScreen(document.body.clientWidth);
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [page, setPage] = useState(1);

  const switchPage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
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

      <PaginationContext.Provider
        value={{
          page: page,
          switchPage: switchPage,
        }}
      >
        <div className={isMobile ? 'main mobile' : 'main'}>
          {(!isMobile && <Filter />) || <Burger isOpen={isBurgerOpen} setOpen={setBurgerOpen} />}

          {!isBurgerOpen && <FilmList films={films} />}
        </div>
      </PaginationContext.Provider>
    </ScreenContext.Provider>
  );
};

export default App;
