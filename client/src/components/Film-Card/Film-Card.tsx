import React, { useContext } from 'react';
import { Film } from '../../types';
import { useAuth } from '../../hooks/auth.hook';
import { AuthPopupContext } from '../../context/AuthPopup';
import { FavouriteAPI } from '../../services/FavouritesService';
import { WatchLaterAPI } from '../../services/WatchLaterService';
import './Film-Card.scss';

const FilmCard: React.FC<Film> = ({ vote_average, poster_path, title, id }) => {
    const { isAuth, token } = useAuth();
    const { open } = useContext(AuthPopupContext);

    const { data: favourites } = FavouriteAPI.useFetchUserFavouritesQuery(token);
    const { data: watchLaterFilms } = WatchLaterAPI.useFetchUserWatchLaterQuery(token);

    const [addFavourite] = FavouriteAPI.useAddUserFavouritesMutation();
    const [removeFavourite] = FavouriteAPI.useRemoveUserFavouritesMutation();

    const [addWatchLater] = WatchLaterAPI.useAddUserWatchLaterMutation();
    const [removeWatchLater] = WatchLaterAPI.useRemoveUserWatchLaterMutation();

    let isFavourite = false;
    let isWatchLater = false;

    if (isAuth && favourites && watchLaterFilms) {
        isFavourite = favourites.includes(id);
        isWatchLater = watchLaterFilms.includes(id);
    }

    const onFavouriteHandler = async () => {
        if (!isAuth) return open();
        if (favourites.includes(id)) {
            await removeFavourite({ token: token, put: { filmId: id } });
        } else {
            await addFavourite({ token: token, put: { filmId: id } });
        }
    };

    const onWatchLaterHandler = async () => {
        if (!isAuth) return open();
        if (watchLaterFilms.includes(id)) {
            await removeWatchLater({ token: token, put: { filmId: id } });
        } else {
            await addWatchLater({ token: token, put: { filmId: id } });
        }
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
