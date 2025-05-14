import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthForm from './pages/AuthForm';
import RegForm from './pages/RegForm';
import ProfilePage from './pages/ProfilePage';
import CarCard from './components/CarCard';
import AdminCarCard from './components/AdminCarCard';
import CarDetail from './pages/CarDetail';
import CarPage from './pages/CarPage';
import AddAvtoPage from './pages/AddAvtoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/reg" element={<RegForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/carCard" element={<CarCard />} />
        <Route path="/adminCarCard" element={<AdminCarCard />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/car/:carId" element={<CarPage />} />
        <Route path="/add-car" element={<AddAvtoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
