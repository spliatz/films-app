import React, { useContext } from 'react';
import { Film } from '../../types';
import FilmCard from '../Film-Card/Film-Card';
import { PaginationContext } from '../../context/PaginationContext';
import './Films-List.scss';
import PageSwitcher from '../Pagination/PageSwitcher';
import { ScreenContext } from '../../context/ScreenContext';

interface Props {
  films: Film[];
}

const FilmList: React.FC<Props> = ({ films }) => {
  const { page } = useContext(PaginationContext);
  const { isMobile } = useContext(ScreenContext);

  return (
    <>
      {isMobile && <PageSwitcher />}

      <div className="film-list-wrapper">
        {films.slice(10 * page - 10, 10 * page).map((item, index) => {
          // if (index >= 10 * page - 10 && index < 10 * page) {
          //   return (
          //     <FilmCard {...item}/>
          //   );
          // }
          // return null;
          return <FilmCard {...item} />;
        })}
      </div>
    </>
  );
};

export default FilmList;
