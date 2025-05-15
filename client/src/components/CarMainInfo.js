import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CarMainInfo.css';

const CarMainInfo = ({ car }) => {
   const navigate = useNavigate();
  const photos = car.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Проверяем, добавлен ли автомобиль в избранное
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const token = localStorage.getItem('userData') 
          ? JSON.parse(localStorage.getItem('userData')).token 
          : null;
        
        if (!token) return;

        const response = await axios.get(`http://194.87.146.152/favorites`, {
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
        await axios.delete(`http://194.87.146.152/favorites/${car._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post(`http://194.87.146.152/favorites/${car._id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      setIsFavorite(!isFavorite);
      setNotification(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное');
      setTimeout(() => setNotification(null), 2000);
    } catch (error) {
      console.error('Ошибка при изменении избранного:', error);
      if (error.response?.status === 401) {
        navigate('/auth');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const left = rect.width * 0.2;
    const right = rect.width * 0.8;

    if (clickX < left) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
    } else if (clickX > right) {
      setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
    } else {
      setIsFullscreen(true);
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleEdgeEnter = (edge) => {
    setHoveredEdge(edge);
  };

  const handleEdgeLeave = () => {
    setHoveredEdge(null);
  };

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="car-main-info">
      <div className="photos-block">
        {photos.length > 0 && (
          <div
            className="photo-clickable-wrapper"
            onClick={handleClick}
          >
            <img
              src={photos[currentIndex]}
              alt="Фото автомобиля"
              className="main-photo"
            />
            <div
              className={`edge left ${hoveredEdge === 'left' ? 'hover' : ''}`}
              onMouseEnter={() => handleEdgeEnter('left')}
              onMouseLeave={handleEdgeLeave}
            ></div>
            <div
              className={`edge right ${hoveredEdge === 'right' ? 'hover' : ''}`}
              onMouseEnter={() => handleEdgeEnter('right')}
              onMouseLeave={handleEdgeLeave}
            ></div>
          </div>
        )}

        {photos.length > 1 && (
          <div className="thumbnails">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Миниатюра ${index + 1}`}
                className={`thumbnail ${currentIndex === index ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="info-block">
        <div className="car-title-with-fav">
          <h1>{car.brand} {car.model} {car.generation}, {car.year}</h1>
          <div className="car-actions">
            <button 
              className={`fav-button ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              disabled={isLoading}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
            <button className="contact-button" onClick={handleContactClick}>
              Связаться
            </button>
          </div>  
        </div>
        <p><strong>Цена:</strong> {car.price.toLocaleString()} ₽</p>
        <p><strong>Пробег:</strong> {car.mileage.toLocaleString()} км</p>
        <p><strong>Двигатель:</strong> {car.engineVolume} л / {car.enginePower} л.с / {car.engineType}</p>
        <p><strong>Кузов:</strong> {car.bodyType}</p>
        <p><strong>Коробка:</strong> {car.transmission}</p>
        <p><strong>Цвет:</strong> {car.color}</p>

        {car.additionalInfo && (
          <>
            <h3>Дополнительная информация:</h3>
            <p><strong>Дополнительно:</strong> {car.additionalInfo}</p>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>С вами свяжутся</p>
            <button className="modal-close" onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}

      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img
            src={photos[currentIndex]}
            alt="Полноэкранное фото"
            className="fullscreen-image"
          />
        </div>
      )}
       {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default CarMainInfo;
