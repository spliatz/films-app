import React, { useContext } from 'react';
import { Film } from '../../types';
import './Detail-FIlm-Card.scss';
import { ScreenContext } from '../../context/ScreenContext';
import { Table } from '@mui/material';

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
  vote_average,
  release_date,
  original_language,
}) => {
  return (
    <div className="detail__wrapper">
      <div className="detail__content">
        <div
          className="top-block"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
          }}
        >
          <div className="top__content">
            <div className="top__poster">
              <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="no bg" />
            </div>
            <div className="main-info">
              <h1>{title}</h1>
              <p>Rate: {vote_average}</p>
              <p>{overview}</p>
            </div>
          </div>
        </div>
        <div className="other-info">
          <h2>Details</h2>
          <p>
            <b>Status:</b> Released
          </p>
          <p>
            <b>Original title:</b> {original_title}
          </p>
          <p>
            <b>Release date:</b> {release_date}
          </p>
          <p>
            <b>Original language:</b> {original_language}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailFIlmCard;
