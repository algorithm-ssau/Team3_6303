import React, { useState, useEffect } from 'react';
import '../styles/CarCard.css';

const CarCard = ({ car }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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

  // Автопрокрутка
  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto();
    }, 5000); // каждые 5 секунд

    return () => clearInterval(interval);
  }, [car.photos.length]);

  return (
    <div className="car-card">
      {/* Фото автомобиля на всю ширину карточки */}
      <div className="photo-wrapper">
        <img
          src={car.photos[currentPhotoIndex]}
          alt={`Фото ${car.brand} ${car.model}`}
          className="car-main-photo"
        />
        {car.photos.length > 1 && (
          <>
            <button onClick={prevPhoto} className="slider-btn left">&lt;</button>
            <button onClick={nextPhoto} className="slider-btn right">&gt;</button>
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
          <button className="show-more-btn" onClick={toggleFeatures}>
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
        <button className="favorite-btn">
          {/* SVG icon */}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
