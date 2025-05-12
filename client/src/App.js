import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthForm from './pages/AuthForm';
import RegForm from './pages/RegForm';
import CarCard from './components/CarCard';
import AdminCarCard from './components/AdminCarCard';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/reg" element={<RegForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/carCard" element={<CarCard />} />
        <Route path="/adminCarCard" element={<AdminCarCard />} />
        <Route path="/car/:id" element={<CarDetailPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
