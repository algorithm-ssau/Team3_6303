import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import AuthForm from './pages/AuthForm';
import CarCard from './components/CarCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/carCard" element={<CarCard />} />

      </Routes>
    </Router>
  );
}

export default App;
