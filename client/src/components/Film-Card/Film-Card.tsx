import React, { useState } from 'react';
import { Film } from '../../types';
import './Film-Card.scss';

const FilmCard: React.FC<Film> = ({ vote_average, poster_path, title }) => {
  const [isFavourite, setFavourite] = useState(false);
  const [isWatchLater, setWatchLater] = useState(false);

  const onFavouriteHandler = () => {
    setFavourite((prevState) => !prevState);
  };

  const onWatchLaterHandler = () => {
    setWatchLater((prevState) => !prevState);
  };

  return (
    <div className="film-card">
      <div className="card-image">
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="no photo :(" />
      </div>
      <div className="card-info">
        <div className="rate-and-buttons">
          <p>Rate: {vote_average}</p>
          <button className="star" onClick={onFavouriteHandler}>
            {(isFavourite && '⭐') || '☆'}
          </button>
          <button className="bookmark" onClick={onWatchLaterHandler}>
            <img
              src={
                (isWatchLater &&
                  'https://www.shareicon.net/data/2015/12/14/687209_bookmark_512x512.png') ||
                'https://cdn-icons-png.flaticon.com/512/709/709496.png'
              }
              alt="no photo :("
            />
          </button>
        </div>
        <h3>{title}</h3>
        <div className="divide-line" />
        <a className="more-info" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
};

export default FilmCard;
