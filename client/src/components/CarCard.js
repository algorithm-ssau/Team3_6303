import React, { useState } from 'react';
import '../styles/CarCard.css';

const CarCard = ({ car }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const toggleFeatures = () => {
    setShowAllFeatures(!showAllFeatures);
  };

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

  return (
    <div className="car-card">
      {/* Фото автомобиля с кнопками */}
      <div className="car-photo-slider">
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

      <div className="divider"></div>

      {/* Цена */}
      <h3 className="car-price">{formatPrice(car.price)}</h3>

      {/* Название модели */}
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
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path d="M10 1.61804L12.3607 6.68237L12.4616 6.89329H12.6943H18.1847L13.9739 10.1803L13.7989 10.3132L13.8998 10.5241L16.2605 15.5884L10.9661 11.9755L10.8 11.8541L10.6339 11.9755L5.33953 15.5884L7.70022 10.5241L7.80114 10.3132L7.62612 10.1803L3.41529 6.89329H8.9057H9.13842L9.23934 6.68237L11.6 1.61804Z" stroke="#333" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarCard;
