import { ActionAuth } from '../types';

export interface init {
    isAuth: boolean;
    token: null | string;
}

const initial: init = {
    isAuth: false,
    token: '',
};

export const Auth = (state: init = initial, action: ActionAuth) => {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, { isAuth: true, token: action.payload });
        case 'LOGOUT':
            return Object.assign({}, state, { isAuth: false, token: '' });
        default:
            return state;
    }
};

export const ActionLogin = (payload: string) => ({
    type: 'LOGIN',
    payload,
});

export const ActionLogout = () => ({
    type: 'LOGOUT',
});
