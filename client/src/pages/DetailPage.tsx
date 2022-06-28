import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailFIlmCard from '../components/Detail-Film-Card/Detail-FIlm-Card';
import { Data } from '../const';
import { Film } from '../types';

const DetailPage = () => {
  const [film, setFilm] = useState<Film | null>(null);
  const id = Number(useParams().id);

  useEffect(() => {
    const searchedFilm = Data.filter((item) => item.id === id)[0];

    if (searchedFilm) {
      setFilm(searchedFilm);
    } else {
      setFilm(null);
    }
  }, [film]);

  useEffect(() => {
    if (film) {
      document.title = film.title || film.original_title;
    }
  }, [film]);

  return <>{film && <DetailFIlmCard {...film} />}</>;
};

export default DetailPage;
