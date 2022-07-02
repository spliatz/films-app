import React, { useState } from 'react';
import { Data } from '../const';
import SearchForm from '../components/SearchForm/SearchForm';
import { ISearchForm, Film } from '../types';
import FilmCard from '../components/Film-Card/Film-Card';
import { searchFilter } from '../components/SearchForm/util';

const SearchPage = () => {
    const [form, setForm] = useState<ISearchForm>({
        rate: null,
        popularity: null,
        genre: null,
    });

    const [order, serOrder] = useState(0);

    const [films, setFilms] = useState<Film[] | null>(null);

    const pickFilm = () => {
        if (form.rate !== null && form.popularity !== null && form.genre !== null) {
            setFilms(searchFilter(form.rate, form.popularity, form.genre, Data));
        } else {
            return alert('Заполните все поля!');
        }
    };

    const changeOrder = () => {
        if (films) {
            serOrder((prev) => {
                if (films[prev + 1]) return prev + 1;
                return 1;
            });
        }
    };

    return (
        <div className="search__wrapper">
            <h1>Подобрать фильм по своим предпочтениям</h1>
            <div className="search__content">
                <SearchForm form={form} setForm={setForm} pickFilm={pickFilm} />
                <div className="search-answer">
                    {(!!films && !!films[order] && (
                        <>
                            <FilmCard {...films[order]} />
                            <div className="accept-denied">
                                <a href={`/detail/${films[order].id}`}>подтвердить</a>
                                <button onClick={changeOrder}>отклонить</button>
                            </div>
                        </>
                    )) || <h2 className="films-empty-error">Пока таких фильмов нет :(</h2>}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
