import React, { SetStateAction } from 'react';
import { Film } from '../../types';
import FilmCard from '../Film-Card/Film-Card';
import './Films-List.scss';

interface Props {
  films: Film[];
  setFilms: React.Dispatch<SetStateAction<Film[]>>;
}

const FilmList: React.FC<Props> = ({ films, setFilms }) => {
  return (
    <div className="film-list-wrapper">
      {films.map((item: Film, index: number) => {
        return (
          <FilmCard
            key={index}
            image={item.image}
            name={item.name}
            rate={item.rate}
            isFavourite={item.isFavourite}
            isWatchLater={item.isWatchLater}
            id={index}
            setFilms={setFilms}
          />
        );
      })}
    </div>
  );
};

export default FilmList;
