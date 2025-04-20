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
      </Routes>
    </Router>
  );
}

export default App;
