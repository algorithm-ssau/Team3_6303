import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import AuthForm from './pages/AuthForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/" element={<MainPage />} />

      </Routes>
    </Router>
  );
}

export default App;
