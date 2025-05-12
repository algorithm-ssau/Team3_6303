import React, { useState } from 'react';
import './FilterPanel.css'; // Создайте файл стилей для фильтров

const FilterPanel = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    transmission: '',
    color: '',
    bodyType: '',
    engineType: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    mileageMax: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-panel">
      <h3>Фильтры</h3>
      <div className="filter-group">
        <label>Коробка передач</label>
        <select name="transmission" value={filters.transmission} onChange={handleChange}>
          <option value="">Все</option>
          {['автомат', 'механика', 'робот', 'вариатор'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Цвет</label>
        <select name="color" value={filters.color} onChange={handleChange}>
          <option value="">Все</option>
          {['черный', 'серебристый', 'белый', 'серый', 'синий', 'красный', 'зеленый', 'коричневый', 'другого цвета'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Тип кузова</label>
        <select name="bodyType" value={filters.bodyType} onChange={handleChange}>
          <option value="">Все</option>
          {['хэтчбек', 'универсал', 'седан', 'купе', 'внедорожник', 'фургон', 'пикап', 'лимузин', 'кабриолет'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Тип топлива</label>
        <select name="engineType" value={filters.engineType} onChange={handleChange}>
          <option value="">Все</option>
          {['бензин', 'дизель', 'гибрид', 'электро', 'газ'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Цена (₽)</label>
        <input type="number" name="priceMin" placeholder="От" value={filters.priceMin} onChange={handleChange} />
        <input type="number" name="priceMax" placeholder="До" value={filters.priceMax} onChange={handleChange} />
      </div>

      <div className="filter-group">
        <label>Год выпуска</label>
        <input type="number" name="yearMin" placeholder="От" value={filters.yearMin} onChange={handleChange} />
        <input type="number" name="yearMax" placeholder="До" value={filters.yearMax} onChange={handleChange} />
      </div>

      <div className="filter-group">
        <label>Максимальный пробег (км)</label>
        <input type="number" name="mileageMax" placeholder="До" value={filters.mileageMax} onChange={handleChange} />
      </div>
    </div>
  );
};

export default FilterPanel;