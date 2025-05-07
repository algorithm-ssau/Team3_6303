import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
   
  );
};

export default MainPage;