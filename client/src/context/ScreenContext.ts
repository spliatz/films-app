import { createContext } from 'react';

export const ScreenContext = createContext({
  isMobile: false,
  isDesktop: false,
});
