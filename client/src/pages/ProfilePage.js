import React, { useEffect, useState } from 'react';
import { FaUser, FaPlus, FaHeart, FaRegHeart, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import HeaderC from '../components/HeaderC';
import FooterC from '../components/FooterC';
import api from '../utilits/api';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get('/protected/me');
        setUser(userResponse.data);
        
        const carsResponse = await api.get('/favorites');
        setCars(carsResponse.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleFavorite = async (carId) => {
    try {
      const isFavorite = cars.some(car => car._id === carId);
      
      if (isFavorite) {
        await api.delete(`/favorites/${carId}`);
        setCars(cars.filter(car => car._id !== carId));
      } else {
        const response = await api.post(`/favorites/${carId}`);
        setCars([...cars, response.data.car]);
      }
    } catch (error) {
      console.error('Ошибка при изменении избранного:', error);
    }
  };

  const handleAddCarClick = () => {
    navigate('/add-car');
  };

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!user) {
    return <div className="error">Не удалось загрузить данные пользователя</div>;
  }

  return (
    <div className="profile-page">
      <HeaderC />
      <div className="profile-wrap">
        <div className="profile-container">
          <div className="left-block">
            <h3 className="profile-title">Профиль</h3>
            <div className="profile-icon">
              <FaUser size={300} />
            </div>
            <h2 className="profile-name">{user.nickname || 'Пользователь'}</h2>
            <p className="profile-status">{user.type ? 'Администратор' : 'Покупатель'}</p>
            
            <div className="profile-contacts">
              <p className="profile-phone">Телефон: {user.phone_number}</p>
              <p className="profile-email">Email: {user.email}</p>
            </div>

            {user.type ? (
              <button className="add-car-btn" onClick={handleAddCarClick}>
                <FaPlus /> Добавить машину
              </button>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>
                 Выйти <FaSignOutAlt />
              </button>
            )}
          </div>
          <div className="right-block">
            <h1 className="favourites-title">Избранное</h1>
            <div className="cars-list">
              {cars.length > 0 ? (
                cars.map((car) => (
                  <div key={car._id} className="car-card">
                    <img src={car.photos[0]} alt={`${car.brand} ${car.model}`} />
                    <div className="car-info">
                      <h3>{car.brand} {car.model}</h3>
                      <p>Цена: {car.price.toLocaleString()} ₽</p>
                      <p>Коробка: {car.transmission}</p>
                      <p>Цвет: {car.color}</p>
                      <p>Год: {car.year}</p>
                    </div>
                    <button 
                      className="favorite-btn"
                      onClick={() => handleToggleFavorite(car._id)}
                    >
                      <FaHeart className="favorite-icon" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-cars">У вас пока нет избранных машин</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default ProfilePage;
