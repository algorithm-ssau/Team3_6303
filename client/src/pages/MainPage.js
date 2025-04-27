import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header'; // Импортируем header
// import Header from '..src\components\header';
// import header from '../components/Header';
import HeaderC from '../components/HeaderC';

const MainPage = () => {
  // const navigate = useNavigate();

  // const handleRegisterClick = () => {
  //   navigate('/reg');
  // };

  return (

    <div className="main-container">
      <HeaderC/> {/* Вставляем Header */}
      <div className="page-content">
        <h2>Добро пожаловать в AutoLambada!</h2>
        <p>Здесь вы найдете лучшие предложения по продаже автомобилей</p>
      </div>
    </div>
    // <div style={{ 
    //   display: 'flex', 
    //   justifyContent: 'center', 
    //   alignItems: 'center', 
    //   height: '100vh' 
    // }}>
    //   <button 
    //     onClick={handleRegisterClick}
    //     style={{
    //       padding: '10px 20px',
    //       fontSize: '16px',
    //       backgroundColor: '#4CAF50',
    //       color: 'white',
    //       border: 'none',
    //       borderRadius: '4px',
    //       cursor: 'pointer'
    //     }}
    //   >
    //     Зарегистрироваться
    //   </button>
    // </div>
  );
};

export default MainPage;