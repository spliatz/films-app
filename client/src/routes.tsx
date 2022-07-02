import React from 'react';
import { Route, Navigate, Routes as Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/home" element={<MainPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Switch>
    );
};
