import React, { useContext, useEffect, useState } from 'react';
import { Film, IStore } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { ActionFavouriteAdd, ActionFavouriteRemove } from '../../reducers/favourite.reducer';
import { ActionWatchLaterAdd, ActionWatchLaterRemove } from '../../reducers/watchLater.reducer';
import { useAuth } from '../../hooks/auth.hook';
import { AuthPopupContext } from '../../context/AuthPopup';
import './Film-Card.scss';

const FilmCard: React.FC<Film> = ({ vote_average, poster_path, title, id }) => {
    const [isFavourite, setFavourite] = useState(false);
    const [isWatchLater, setWatchLater] = useState(false);

    const { isAuth } = useAuth();
    const { open } = useContext(AuthPopupContext);

    const favouriteFilms = useSelector((state: IStore) => state.Favourites);
    const watchLaterFilms = useSelector((state: IStore) => state.WatchLater);
    const dispatch = useDispatch();

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

    useEffect(() => {
        if (!isAuth) {
            setFavourite(false);
            setWatchLater(false);
            return;
        }
        setFavourite(favouriteFilms.includes(id));
        setWatchLater(watchLaterFilms.includes(id));
    }, [favouriteFilms, watchLaterFilms, isAuth]);

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
                <a className="more-info" href={`/detail/${id}`} target={'_blank'}>
                    Подробнее
                </a>
            </div>
        </div>
    );
};

export default FilmCard;
