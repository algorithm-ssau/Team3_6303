import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminCarCard.css';

const AdminCarCard = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    year: '',
    mileage: '',
    engineVolume: '',
    enginePower: '',
    engineType: 'бензин',
    transmission: 'автомат',
    bodyType: 'седан',
    color: 'белый',
    photos: [],
    additionalInfo: ''
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numberFields = ['price', 'year', 'mileage', 'engineVolume', 'enginePower'];
    setFormData(prev => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value
    }));
  };

  const handleFileUpload = async (files) => {
    const urls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_cloudinary_preset');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
          formData
        );
        urls.push(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    setFormData(prev => ({
      ...prev,
      photos: urls
    }));
    setImageUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/cars', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      setSuccessMessage(`${formData.brand} ${formData.model} успешно добавлен!`);
      setFormData({
        brand: '',
        model: '',
        price: '',
        year: '',
        mileage: '',
        engineVolume: '',
        enginePower: '',
        engineType: 'бензин',
        transmission: 'автомат',
        bodyType: 'седан',
        color: 'белый',
        photos: [],
        additionalInfo: ''
      });
      setImageUrls([]);
    } catch (error) {
      console.error('Ошибка:', error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-car-card">
      <h2>Добавить новый автомобиль</h2>

      <form onSubmit={handleSubmit}>
        {/* Загрузка фото */}
        <div className="form-group">
          <label>Фотографии</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            accept="image/*"
          />
          <div className="image-preview">
            {imageUrls.map((url, i) => (
              <img key={i} src={url} alt={`Preview ${i}`} />
            ))}
          </div>
        </div>

        {/* Основные поля */}
        <div className="form-row">
          <div className="form-group">
            <label>Марка</label>
            <input 
              type="text" 
              name="brand" 
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Модель</label>
            <input 
              type="text" 
              name="model" 
              value={formData.model}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Технические характеристики */}
        <div className="form-row">
          <div className="form-group">
            <label>Год</label>
            <input 
              type="number" 
              name="year" 
              value={formData.year}
              onChange={handleInputChange}
              min="1960"
              max={new Date().getFullYear()}
              required
            />
          </div>
          <div className="form-group">
            <label>Цена (₽)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Пробег (км)</label>
            <input 
              type="number" 
              name="mileage" 
              value={formData.mileage}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Объем двигателя (л)</label>
            <input 
              type="number" 
              name="engineVolume" 
              value={formData.engineVolume}
              onChange={handleInputChange}
              step="0.1"
              required
            />
          </div>
          <div className="form-group">
            <label>Мощность (л.с.)</label>
            <input 
              type="number" 
              name="enginePower" 
              value={formData.enginePower}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Выборы из enum'ов */}
        <div className="form-row">
          <div className="form-group">
            <label>Тип кузова</label>
            <select 
              name="bodyType" 
              value={formData.bodyType}
              onChange={handleInputChange}
              required
            >
              {['хэтчбек', 'универсал', 'седан', 'купе', 'внедорожник', 'фургон', 'пикап', 'лимузин', 'кабриолет'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Тип двигателя</label>
            <select 
              name="engineType" 
              value={formData.engineType}
              onChange={handleInputChange}
              required
            >
              {['бензин', 'дизель', 'гибрид', 'электро', 'газ'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Коробка передач</label>
            <select 
              name="transmission" 
              value={formData.transmission}
              onChange={handleInputChange}
              required
            >
              {['автомат', 'механика', 'робот', 'вариатор'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Цвет</label>
            <select 
              name="color" 
              value={formData.color}
              onChange={handleInputChange}
              required
            >
              {['черный', 'серебристый', 'белый', 'серый', 'синий', 'красный', 'зеленый', 'коричневый', 'другого цвета'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="form-group">
          <label>Дополнительная информация</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
          />
        </div>

        {/* Кнопка отправки */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Добавляем...' : 'Добавить автомобиль'}
        </button>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminCarCard;
