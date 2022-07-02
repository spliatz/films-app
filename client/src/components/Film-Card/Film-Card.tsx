import React, { useContext, useEffect, useState } from 'react';
import { Film, IStore } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { ActionFavouriteAdd, ActionFavouriteRemove } from '../../reducers/favourite.reducer';
import { ActionWatchLaterAdd, ActionWatchLaterRemove } from '../../reducers/watchLater.reducer';
import { useAuth } from '../../hooks/auth.hook';
import { AuthPopupContext } from '../../context/AuthPopup';
import './Film-Card.scss';

const FilmCard: React.FC<Film> = ({ vote_average, poster_path, title, id }) => {
    const { isAuth } = useAuth();
    const { open } = useContext(AuthPopupContext);

    const favouriteFilms = useSelector((state: IStore) => state.Favourites);
    const watchLaterFilms = useSelector((state: IStore) => state.WatchLater);
    const dispatch = useDispatch();

    let isFavourite = false;
    let isWatchLater = false;

    if (isAuth) {
        isFavourite = favouriteFilms.includes(id);
        isWatchLater = watchLaterFilms.includes(id);
    }

    const onFavouriteHandler = () => {
        if (!isAuth) return open();
        if (favouriteFilms.includes(id)) {
            return dispatch(ActionFavouriteRemove(id));
        }

        dispatch(ActionFavouriteAdd(id));
    };

    const onWatchLaterHandler = () => {
        if (!isAuth) return open();
        if (watchLaterFilms.includes(id)) {
            return dispatch(ActionWatchLaterRemove(id));
        }

        dispatch(ActionWatchLaterAdd(id));
    };

    return (
        <div className="film-card">
            <div className="card-image">
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="no photo :(" />
            </div>
            <div className="card-info">
                <div className="rate-and-buttons">
                    <p>Rate: {vote_average}</p>
                    <button className="star-btn" onClick={onFavouriteHandler}>
                        <i className={isFavourite ? 'star-icon star-icon-fill' : 'star-icon'} />
                    </button>
                    <button className="bookmark" onClick={onWatchLaterHandler}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-bookmark-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"
                                fill={isWatchLater ? 'rgb(93, 81, 173)' : 'rgb(44, 43, 52)'}
                            />
                        </svg>
                    </button>
                </div>
                <h3>{title}</h3>
                <div className="divide-line" />
                <a className="more-info" href={`/detail/${id}`} target={'_blank'}>
                    Подробнее
                </a>
            </div>
        </div>
    );
};

export default FilmCard;
