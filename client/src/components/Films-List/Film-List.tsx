import React from 'react';
import { Film } from '../../types';
import FilmCard from '../Film-Card/Film-Card';
import './Films-List.scss';

interface Props {
  films: Film[];
}

const FilmList: React.FC<Props> = ({ films }) => {
  return (
    <div className="film-list-wrapper">
      {films.map((item, index) => {
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
      })}
    </div>
  );
};

export default FilmList;
