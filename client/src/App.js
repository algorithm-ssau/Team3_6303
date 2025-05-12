import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeaderC  from './components/HeaderC';
import MainPage from './pages/MainPage';
import AuthForm from './pages/AuthForm';
import RegForm  from './pages/RegForm';
import CarsPage from './pages/CarsPage';   //  ← новая страница каталога

/**
 * Глобальный роутер приложения.
 * HeaderC выводится на всех страницах,
 * между маршрутами переключаемся через React-Router v6.
 */
export default function App() {
  return (
    <Router>
      <HeaderC />

      <Routes>
        <Route path="/"      element={<MainPage />} />
        <Route path="/auth"  element={<AuthForm />} />
        <Route path="/reg"   element={<RegForm  />} />
        <Route path="/cars"  element={<CarsPage />} />

        {/* fallback на главную, если путь не совпал */}
        <Route path="*"      element={<MainPage />} />
      </Routes>
    </Router>
  );
}
