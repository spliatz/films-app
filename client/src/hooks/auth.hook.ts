import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionLogin, ActionLogout } from '../reducers/auth.reducer';
import { IStore } from '../types';

export const useAuth = () => {
  const [isAuth, setAuth] = useState(false);

  const selector = useSelector((state: IStore) => state.Auth);
  const dispatch = useDispatch();

  const login = useCallback(() => {
    localStorage.setItem('user', JSON.stringify(new Date()));
    dispatch(ActionLogin());
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    dispatch(ActionLogout());
  }, []);

  useEffect(() => {
    if (!!JSON.parse(localStorage.getItem('user') as string)) {
      dispatch(ActionLogin());
    }
  }, []);

  useEffect(() => {
    setAuth(selector.isAuth);
  }, [selector]);

  return { isAuth, login, logout };
};
