import { ActionAuth } from '../types';

export const Auth = (state: boolean = false, action: ActionAuth) => {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
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
