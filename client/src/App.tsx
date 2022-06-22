import React, { useState } from 'react';
import Header from './components/Header/Header';
import FilmList from './components/Films-List/Film-List';
import Filter from './components/Filter/Filter';
import { Container, Grid } from '@mui/material';
import * as Const from './const';
import './index.scss';
import { Film } from './types';

const App = () => {
  const [films, setFilms] = useState<Film[]>(Const.initialFilms);

  return (
    <>
      <Header />

      <div className="main">
        <Filter />

        <FilmList films={films} setFilms={setFilms} />
      </div>
    </>
  );
};

export default App;
