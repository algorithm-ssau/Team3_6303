import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CarCard.css';

const CarCard = ({ car }) => {
   const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

 // Проверяем, добавлен ли автомобиль в избранное
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const token = localStorage.getItem('userData') 
          ? JSON.parse(localStorage.getItem('userData')).token 
          : null;
        
        if (!token) return;

        const response = await axios.get(`http://194.87.146.152:4000/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const isCarFavorite = response.data.some(favCar => favCar._id === car._id);
        setIsFavorite(isCarFavorite);
      } catch (error) {
        console.error('Ошибка проверки избранного:', error);
      }
    };

    checkFavoriteStatus();
  }, [car._id]);

  const toggleFavorite = async (e) => {
  e.stopPropagation();
  setIsLoading(true);

  try {
    const token = localStorage.getItem('userData') 
      ? JSON.parse(localStorage.getItem('userData')).token 
      : null;

    if (!token) {
      navigate('/auth');
      return;
    }

    if (isFavorite) {
      await axios.delete(`http://194.87.146.152:4000/favorites/${car._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      await axios.post(`http://194.87.146.152:4000/favorites/${car._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    setIsFavorite(!isFavorite);
    setNotification(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное'); // Добавлено здесь
    setTimeout(() => setNotification(null), 2000); // Добавлено здесь
  } catch (error) {
    console.error('Ошибка при изменении избранного:', error);
    if (error.response?.status === 401) {
      navigate('/auth');
    }
  } finally {
    setIsLoading(false);
  }
};

  const toggleFeatures = () => setShowAllFeatures(!showAllFeatures);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price).replace('₽', '₽');
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? car.photos.length - 1 : prev - 1
    );
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === car.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleCardClick = () => {
    navigate(`/car/${car._id}`);
  };

  // Автопрокрутка
  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto();
    }, 5000); // каждые 5 секунд

    return () => clearInterval(interval);
  }, [car.photos.length]);

  return (
    <div className="car-card" onClick={handleCardClick}>
      {/* Фото автомобиля на всю ширину карточки */}
      <div className="photo-wrapper">
        <img
          src={car.photos[currentPhotoIndex]}
          alt={`Фото ${car.brand} ${car.model}`}
          className="car-main-photo"
        />
        {car.photos.length > 1 && (
          <>
            <button
              className="slider-btn left"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
            >
              &lt;
            </button>

            <button
              className="slider-btn right"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {/* Характеристики */}
      <div className="car-features">
        {car.additionalInfo && (
          car.additionalInfo.split(',').slice(0, showAllFeatures ? undefined : 3).map((feature, index) => (
            <span key={index} className="feature-tag">+{feature.trim()}</span>
          ))
        )}
        {car.additionalInfo && car.additionalInfo.split(',').length > 3 && (
          <button
            className="show-more-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleFeatures();
            }}
          >
            {showAllFeatures ? 'Свернуть' : '+ещё'}
          </button>
        )}
      </div>

      <h3 className="car-price">{formatPrice(car.price)}</h3>

      <h2 className="car-title">
        {car.brand} {car.model} {car.generation}, {car.year}
      </h2>

      <div className="car-details">
        <span className="mileage">{car.mileage.toLocaleString('ru-RU')} км</span>
        <span className="engine">
          {car.engineVolume} л • {car.enginePower} л.с • {car.engineType}
        </span>
        <span className="location">{car.location}</span>
      </div>

      <div className="car-specs">
        <span className="transmission">{car.transmission}</span>
        <span className="body-type">{car.bodyType}</span>
        <span className="color">{car.color}</span>
      </div>

      <div className="car-actions">
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          disabled={isLoading}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      {notification && (
      <div className="notification">
        {notification}
      </div>
    )}
    </div>
  );
};

export default CarCard;
