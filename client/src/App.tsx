import React, { useState, useLayoutEffect } from 'react';
import Header from './components/Header/Header';
import FilmList from './components/Films-List/Film-List';
import Filter from './components/Filter/Filter';
import * as Const from './const';
import { Film } from './types';
import { ScreenContext } from './context/ScreenContext';
import { useScreen } from './hooks/useScreen.hook';
import Burger from './components/Burger/Burger';
import './index.scss';

const App = () => {
  const [films, setFilms] = useState<Film[]>(Const.data);
  const { isDesktop, isMobile, changeWidth } = useScreen(document.body.clientWidth);
  const [isBurgerOpen, setBurgerOpen] = useState(false);

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
        isDesktop: isDesktop,
      }}
    >
      <Header />

      <div className="main">
        {(isDesktop && <Filter />) || <Burger isOpen={isBurgerOpen} setOpen={setBurgerOpen} />}

        {!isBurgerOpen && <FilmList films={films} />}
      </div>
    </ScreenContext.Provider>
  );
};

export default App;
