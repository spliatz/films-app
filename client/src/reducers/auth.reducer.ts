import { ActionAuth, IAuthReducer } from '../types';

const initState = {
  isAuth: false,
};

export const Auth = (state: IAuthReducer = initState, action: ActionAuth) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuth: true };
    case 'LOGOUT':
      return { isAuth: false };
    default:
      return state;
  }
};

export const ActionLogin = () => ({
  type: 'LOGIN',
});

export const ActionLogout = () => ({
  type: 'LOGOUT',
});
