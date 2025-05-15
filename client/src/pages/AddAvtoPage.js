// pages/AddAvtoPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddAvtoPage.css';

const AddAvtoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    photos: [''],
    price: '',
    brand: '',
    model: '',
    transmission: '',
    color: '',
    year: '',
    bodyType: '',
    engineType: '',
    engineVolume: '',
    enginePower: '',
    mileage: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const newPhotos = [...formData.photos];
    newPhotos[currentPhotoIndex] = e.target.value;
    setFormData(prev => ({
      ...prev,
      photos: newPhotos
    }));
  };

  const addPhotoField = () => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, '']
    }));
    setCurrentPhotoIndex(formData.photos.length);
  };

     const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors([]);

  try {
    // Получаем токен из localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.token) {
      throw new Error('Требуется авторизация');
    }

    // Подготавливаем данные для отправки
    const dataToSend = {
      ...formData,
      photos: formData.photos.filter(photo => photo.trim() !== ''),
      price: Number(formData.price),
      year: Number(formData.year),
      engineVolume: Number(formData.engineVolume),
      enginePower: Number(formData.enginePower),
      mileage: Number(formData.mileage)
    };

    const response = await axios.post('http://194.87.146.152:4000/add-car', dataToSend, {
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Content-Type': 'application/json'
       }
    });

    if (response.data.message) {
      navigate('/', { 
        state: { 
          successMessage: 'Автомобиль успешно добавлен!' 
        } 
      });
    }
  } catch (error) {
    if (error.response) {
      // Обработка ошибок от сервера
      if (error.response.status === 403) {
        setErrors(['Требуются права администратора']);
      } else if (error.response.data?.errors) {
        setErrors(error.response.data.errors.map(err => err.msg || err.message));
      } else if (error.response.data?.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['Ошибка при добавлении автомобиля']);
      }
    } else if (error.message) {
      setErrors([error.message]);
    } else {
      setErrors(['Неизвестная ошибка']);
    }
    console.error('Add car error:', error);
  } finally {
    setIsLoading(false);
  }
};

   return (
  <div className="add-avto-container">
    <div className="add-avto-card">
      <h2>Добавить автомобиль</h2>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <div key={index} className="error-message">
              {error}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        {/* Первая колонка - фото */}
        <div className="photo-column">
          <div className="photo-preview">
            {formData.photos[currentPhotoIndex] ? (
              <img 
                src={formData.photos[currentPhotoIndex]} 
                alt="Предпросмотр" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Изображение+не+загружено';
                }}
              />
            ) : (
              <div className="photo-placeholder">
                <span>Предпросмотр фото</span>
              </div>
            )}
          </div>
          
          <div className="photo-inputs">
            {formData.photos.map((photo, index) => (
              <div key={index} className="form-group">
                <label>Ссылка на фото {index + 1}</label>
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => {
                    handlePhotoChange(e);
                    setCurrentPhotoIndex(index);
                  }}
                  placeholder="Введите URL изображения"
                />
              </div>
            ))}
            <button 
              type="button" 
              className="add-photo-btn"
              onClick={addPhotoField}
            >
              Добавить еще фото
            </button>
          </div>
        </div>

        {/* Вторая колонка - 6 элементов */}
        <div className="inputs-column">
          <div className="form-group">
            <label>Цена (руб.)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Введите цену"
              required
            />
          </div>

          <div className="form-group">
            <label>Марка</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Введите марку"
              required
            />
          </div>

          <div className="form-group">
            <label>Модель</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Введите модель"
              required
            />
          </div>

          <div className="form-group">
            <label>Коробка передач</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
            >
              <option value="">Выберите коробку передач</option>
              <option value="автомат">Автомат</option>
              <option value="механика">Механика</option>
              <option value="робот">Робот</option>
              <option value="вариатор">Вариатор</option>
            </select>
          </div>

          <div className="form-group">
            <label>Цвет</label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            >
              <option value="">Выберите цвет</option>
              <option value="черный">Черный</option>
              <option value="серебристый">Серебристый</option>
              <option value="белый">Белый</option>
              <option value="серый">Серый</option>
              <option value="синий">Синий</option>
              <option value="красный">Красный</option>
              <option value="зеленый">Зеленый</option>
              <option value="коричневый">Коричневый</option>
              <option value="другого цвета">Другого цвета</option>
            </select>
          </div>

          <div className="form-group">
            <label>Год выпуска</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1960"
              max={new Date().getFullYear()}
              placeholder={`Год выпуска (1960-${new Date().getFullYear()})`}
              required
            />
          </div>
        </div>

        {/* Третья колонка - 6 элементов (включая дополнительную информацию) */}
        <div className="inputs-column">
          <div className="form-group">
            <label>Тип кузова</label>
            <select
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              required
            >
              <option value="">Выберите тип кузова</option>
              <option value="хэтчбек">Хэтчбек</option>
              <option value="универсал">Универсал</option>
              <option value="седан">Седан</option>
              <option value="купе">Купе</option>
              <option value="внедорожник">Внедорожник</option>
              <option value="фургон">Фургон</option>
              <option value="пикап">Пикап</option>
              <option value="лимузин">Лимузин</option>
              <option value="кабриолет">Кабриолет</option>
            </select>
          </div>

          <div className="form-group">
            <label>Тип двигателя</label>
            <select
              name="engineType"
              value={formData.engineType}
              onChange={handleChange}
              required
            >
              <option value="">Выберите тип двигателя</option>
              <option value="бензин">Бензин</option>
              <option value="дизель">Дизель</option>
              <option value="гибрид">Гибрид</option>
              <option value="электро">Электро</option>
              <option value="газ">Газ</option>
            </select>
          </div>

          <div className="form-group">
            <label>Объем двигателя (л)</label>
            <input
              type="number"
              name="engineVolume"
              value={formData.engineVolume}
              onChange={handleChange}
              step="0.1"
              min="0.5"
              max="10"
              placeholder="Введите объем двигателя"
              required
            />
          </div>

          <div className="form-group">
            <label>Мощность двигателя (л.с.)</label>
            <input
              type="number"
              name="enginePower"
              value={formData.enginePower}
              onChange={handleChange}
              placeholder="Введите мощность"
              required
            />
          </div>

          <div className="form-group">
            <label>Пробег (км)</label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="Введите пробег"
              required
            />
          </div>

          <div className="form-group">
  <label>Дополнительная информация</label>
  <textarea
    name="additionalInfo"
    value={formData.additionalInfo}
    onChange={handleChange}
    placeholder="Введите дополнительную информацию"
    style={{ height: '44px' }} /* Фиксированная высота */
  />
</div>
        </div>

       <div className="form-buttons">
  <button 
    type="submit" 
    className="submit-btn"
    disabled={isLoading}
  >
    {isLoading ? 'Добавление...' : 'Добавить машину'}
  </button>
  <a 
    className="cancel-link" 
    onClick={() => navigate('/')}
  >
    Отмена
  </a>
</div>
      </form>
    </div>
  </div>
);
};

export default AddAvtoPage;