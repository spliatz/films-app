import React, { useLayoutEffect } from 'react';
import Header from './components/Header/Header';
import { ScreenContext } from './context/ScreenContext';
import { useScreen } from './hooks/screen.hook';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import './index.scss';

const App = () => {
  const { isMobile, changeWidth } = useScreen(document.body.clientWidth);

  const routes = useRoutes();

  useLayoutEffect(() => {
    function updateSize() {
      changeWidth(document.body.clientWidth);
    }

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  return (
    <BrowserRouter>
      <ScreenContext.Provider
        value={{
          isMobile: isMobile,
        }}
      >
        <Header />
        {routes}
      </ScreenContext.Provider>
    </BrowserRouter>
  );
};

export default App;
