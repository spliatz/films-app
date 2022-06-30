import { createContext } from 'react';

function pooh() {}

export const AuthPopupContext = createContext({
    isOpen: false,
    open: pooh,
    close: pooh,
});
