import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthForm from './pages/AuthForm';
import RegForm from './pages/RegForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/reg" element={<RegForm />} />
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/add-car" element={<AddCarPage />} />
        <Route path="/profile" element={<ProfielPage />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
