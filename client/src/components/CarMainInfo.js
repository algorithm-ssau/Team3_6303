import React, { useState } from 'react';
import '../styles/CarMainInfo.css';

const CarMainInfo = ({ car }) => {
  const photos = car.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <button className="fav-button" onClick={() => console.log('Добавлено в избранное')}>
              ♥
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
    </div>
  );
};

export default CarMainInfo;
