import React, { useLayoutEffect, useState } from 'react';
import Header from './components/Header/Header';
import { ScreenContext } from './context/ScreenContext';
import { useScreen } from './hooks/screen.hook';
import { useAuth } from './hooks/auth.hook';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { AuthPopupContext } from './context/AuthPopup';
import './index.scss';
import AuthorizationPopup from './components/autorization-popup/authorization-popup';

const App = () => {
  const { isMobile, changeWidth } = useScreen(document.body.clientWidth);

  const { isAuth } = useAuth();

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const routes = useRoutes(isAuth);

  useLayoutEffect(() => {
    function updateSize() {
      changeWidth(document.body.clientWidth);
    }

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  const onOpenLoginPopupHandler = () => {
    setLoginPopupOpen(true);
  };

  const onCloseLoginPopupHandler = () => {
    setLoginPopupOpen(false);
  };

  return (
    <BrowserRouter>
      <ScreenContext.Provider
        value={{
          isMobile: isMobile,
        }}
      >
        <AuthPopupContext.Provider
          value={{
            isOpen: isLoginPopupOpen,
            open: onOpenLoginPopupHandler,
            close: onCloseLoginPopupHandler,
          }}
        >
          <Header/>
            {isLoginPopupOpen && <AuthorizationPopup />}
            {routes}
        </AuthPopupContext.Provider>
      </ScreenContext.Provider>
    </BrowserRouter>
  );
};

export default App;
