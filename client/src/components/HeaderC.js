import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation , useNavigate} from 'react-router-dom'; 
import { FaUser, FaHeart, FaCar, FaSignOutAlt } from 'react-icons/fa';
import '../styles/HeaderC.css';


const HeaderC = () => {

  const [activeLink, setActiveLink] = useState('main'); 
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Проверка авторизации при загрузке и изменении маршрута
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData?.token) {
          // Используем данные из localStorage, если они есть
          setUser(userData);
          
          // Дополнительная проверка токена (опционально)
          const response = await axios.get('http://localhost:4000/protected/me', {
            headers: { Authorization: `Bearer ${userData.token}` }
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('userData');
        setUser(null);
      }
    };
  
    checkAuth();
  }, [location]);

    
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/');
  };

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
            <Link to="/" className={`nav-link ${activeLink === 'main' ? 'active' : ''}`}>
              Главный листинг
            </Link>
            
            {user && (
              <Link to="/favorites" className={`nav-link ${activeLink === 'favorites' ? 'active' : ''}`}>
                Избранное <FaHeart className="heart-icon" />
              </Link>
            )}
            
            {user?.isAdmin && (
              <Link to="/add-car" className={`nav-link ${activeLink === 'add-car' ? 'active' : ''}`}>
                Добавить машину
              </Link>
            )}
            
            {user ? (
              <>
                <Link to="/profile" className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}>
                  Профиль <FaUser className="user-icon" />
                </Link>
                <a 
                 href="#" 
                  onClick={handleLogout} 
                 className={`nav-link ${activeLink === 'logout' ? 'active' : ''}`}
                  > Выйти <FaSignOutAlt className="logout-icon" />
                </a>

              </>
            ) : (
              <Link to="/auth" className={`nav-link ${activeLink === 'auth' ? 'active' : ''}`}>
                Войти/Регистрация <FaUser className="user-icon" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};


export default HeaderC;