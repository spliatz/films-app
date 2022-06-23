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
        {films.map((item, index) => {
          if (index >= 10 * page - 10 && index < 10 * page) {
            return (
              <FilmCard
                key={index}
                adult={item.adult}
                backdrop_path={item.backdrop_path}
                genre_ids={item.genre_ids}
                id={item.id}
                original_language={item.original_language}
                original_title={item.original_title}
                overview={item.overview}
                popularity={item.popularity}
                poster_path={item.poster_path}
                release_date={item.release_date}
                title={item.title}
                video={item.video}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default FilmList;
