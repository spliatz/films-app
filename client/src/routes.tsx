import React from 'react';
import { Route, Navigate, Routes as Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

export const useRoutes = (isAuth: boolean) => {
  return (
    <Switch>
      <Route path="/home" element={<MainPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Switch>
  );
};
