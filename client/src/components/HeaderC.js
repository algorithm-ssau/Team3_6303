import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import { FaUser, FaHeart, FaCar } from 'react-icons/fa';
import '../styles/HeaderC.css';


const HeaderC = () => {

  const [activeLink, setActiveLink] = useState('main'); 
  const [isAdmin, setIsAdmin] = useState(true); //времено 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

     // Синхронизация активной ссылки с текущим URL
     useEffect(() => {
        const path = location.pathname;
        if (path === '/') setActiveLink('main');
        else if (path === '/favorites') setActiveLink('favorites');
        else if (path === '/add-car') setActiveLink('add-car');
        else if (path === '/profile') setActiveLink('profile');
        else if (path === '/auth' || path === '/reg') setActiveLink('auth');
      }, [location]);
      
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
                    >
                        Главный листинг
                    </a>
                    <a 
                        href="/favorites" 
                        className={`nav-link ${activeLink === 'favorites' ? 'active' : ''}`}
                    >
                         Избранное <FaHeart className="heart-icon" />
                    </a>
                    {isAdmin && (
                        <a 
                            href="/add-car" 
                            className={`nav-link ${activeLink === 'add-car' ? 'active' : ''}`}
                        >
                            Добавить машину
                        </a>
                    )}
                   {isAuthenticated ? (<a 
                            href="/profile" 
                            className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}
                        >
                            Профиль <FaUser className="user-icon" />
                        </a>
                    ) : (
                       <a 
                           href="/auth" 
                           className={`nav-link ${activeLink === 'auth' ? 'active' : ''}`}
                       >
                           Зарегистрироваться/Войти <FaUser className="user-icon" />
                       </a>
                    )}
                </div>
            </div>
        </nav>

    </div>
  );
};


export default HeaderC;