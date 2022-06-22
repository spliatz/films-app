import React, { SetStateAction } from 'react';
import { Film } from '../../types';
import './Film-Card.scss';

interface Props extends Film {
  setFilms: React.Dispatch<SetStateAction<Film[]>>;
  id: number;
}

const FilmCard: React.FC<Props> = ({
  image,
  name,
  rate,
  isFavourite,
  isWatchLater,
  setFilms,
  id,
}) => {
  const onFavouriteHandler = () => {
    setFilms((prev) => [
      ...prev.map((item, index) => {
        if (index === id) item.isFavourite = !item.isFavourite;
        return item;
      }),
    ]);
  };

  const onWatchLaterHandler = () => {
    setFilms((prev) => [
      ...prev.map((item, index) => {
        if (index === id) item.isWatchLater = !item.isWatchLater;
        return item;
      }),
    ]);
  };

  return (
    <div className="film-card">
      <div className="card-image">
        <img src={image} alt="no photo :(" />
      </div>
      <div className="card-info">
        <div className="rate-and-buttons">
          <p>{rate}</p>
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
        <h3>{name}</h3>
        <div className="divide-line" />
        <a className="more-info" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
};

export default FilmCard;
