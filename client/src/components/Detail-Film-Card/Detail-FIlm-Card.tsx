import React, { useContext } from 'react';
import { Film } from '../../types';
import './Detail-FIlm-Card.scss';
import { ScreenContext } from '../../context/ScreenContext';

interface Props {
  film: Film;
}

const DetailFIlmCard: React.FC<Film> = ({
  backdrop_path,
  title,
  original_title,
  overview,
  poster_path,
  adult,
}) => {
  const { isMobile } = useContext(ScreenContext);

  if (isMobile) {
      return  (
          <div className={'detail-film-card'}>
              <div className="titles" style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
              }}>
                  <div className='title-text'>
                      <h1>{original_title}</h1>
                      {original_title !== title && <h1>{title}</h1>}
                      {adult && <h1 className={'adult'}>16+</h1>}
                  </div>
              </div>
              <div className='paragraph-container'>
                  {!!overview && <p className="film-description">{overview}</p>}
              </div>
          </div>
      )
  }

  return (
      <div
        className={'detail-film-card'}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div className="titles">
          <h1>{original_title}</h1>
          {original_title !== title && <h1>{title}</h1>}
          {adult && <h1 className={'adult'}>16+</h1>}
        </div>
        {!!overview && <p className="film-description">{overview}</p>}
      </div>
  );
};

export default DetailFIlmCard;
