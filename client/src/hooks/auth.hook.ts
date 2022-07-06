import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionLogin, ActionLogout } from '../reducers/auth.reducer';
import { IStore } from '../types';

export const useAuth = () => {
    const [isAuth, setAuth] = useState(false);

    const selector = useSelector((state: IStore) => state.Auth);
    const dispatch = useDispatch();
    const token = selector.token;

    const login = useCallback((token: string) => {
        localStorage.setItem('user', JSON.stringify(token));
        dispatch(ActionLogin(token));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        dispatch(ActionLogout());
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if (user) {
            dispatch(ActionLogin(user));
        }
    }, []);

    useEffect(() => {
        setAuth(selector.isAuth);
    }, [selector.isAuth]);

    return { isAuth, login, logout, token };
};
