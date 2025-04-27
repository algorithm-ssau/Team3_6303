import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaHeart, FaCar } from 'react-icons/fa';
import '../styles/HeaderC.css';


const HeaderC = () => {

  const [activeLink, setActiveLink] = useState('main'); 
  const [isAdmin, setIsAdmin] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  //Дорелизовать проверку прав пользователя

  return (
    <div className="main-container">
        <nav className="navbar">
            <div className="navbar-content">
                <div className="site-title-container">
                    <div className="wheel-icon">
                        <FaCar />
                    </div>
                    <h1 className="site-title">AutoLambada</h1>
                </div>
                <div className="nav-links">
                    <a 
                        href="/" 
                        className={`nav-link ${activeLink === 'main' ? 'active' : ''}`}
                        onClick={() => setActiveLink('main')}
                    >
                        Главный листинг
                    </a>
                    <a 
                        href="/favorites" 
                        className={`nav-link ${activeLink === 'favorites' ? 'active' : ''}`}
                        onClick={() => setActiveLink('favorites')}
                    >
                         Избранное <FaHeart className="heart-icon" />
                    </a>
                    {isAdmin && (
                        <a 
                            href="/add-car" 
                            className={`nav-link ${activeLink === 'add-car' ? 'active' : ''}`}
                            onClick={() => setActiveLink('add-car')}
                        >
                            Добавить машину
                        </a>
                    )}
                   {isAuthenticated && <a 
                        href="/profile" 
                        className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveLink('profile')}
                    >
                        Профиль <FaUser className="user-icon" />
                    </a>}
                    <a 
                        href="/auth" 
                        className={`nav-link ${activeLink === 'auth' ? 'active' : ''}`}
                        onClick={() => setActiveLink('auth')}
                    >
                        Зарегистрироваться/Войти <FaUser className="user-icon" />
                    </a>
                </div>
            </div>
        </nav>

    </div>
  );
};


export default HeaderC;