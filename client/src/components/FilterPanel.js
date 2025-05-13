import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // стили для rc-slider
import '../styles/FilterPanel.css';

const transmissionOptions = ['автомат', 'механика', 'робот', 'вариатор'];
const colorOptions = ['черный', 'серебристый', 'белый', 'серый', 'синий', 'красный', 'зеленый', 'коричневый', 'другого цвета'];
const bodyTypeOptions = ['хэтчбек', 'универсал', 'седан', 'купе', 'внедорожник', 'фургон', 'пикап', 'лимузин', 'кабриолет'];
const engineTypeOptions = ['бензин', 'дизель', 'гибрид', 'электро', 'газ'];

const toSelectOptions = (arr) => arr.map(val => ({ value: val, label: val }));

const FilterPanel = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    transmission: [],
    color: [],
    bodyType: [],
    engineType: [],
    priceMin: 0,  // Инициализация минимальной ценой
    priceMax: 5000000,  // Инициализация максимальной ценой
    yearMin: 2000,  // Инициализация минимальным годом
    yearMax: 2025,  // Инициализация максимальным годом
    mileageMax: '',
  });

  const [minMaxValues, setMinMaxValues] = useState({
    priceMin: 0,
    priceMax: 5000000,
    yearMin: 2000,
    yearMax: 2025,
  });

  // Функция для получения минимальных и максимальных значений с сервера
  useEffect(() => {
    const fetchMinMaxValues = async () => {
      try {
        const res = await axios.get('/api/cars/filter-ranges');
        setMinMaxValues(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке диапазонов фильтров:', err);
      }
    };

    fetchMinMaxValues();
  }, []);

  const handleMultiSelectChange = (selected, name) => {
    const values = selected ? selected.map(opt => opt.value) : [];
    const newFilters = { ...filters, [name]: values };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSliderChange = (value, name) => {
    const newFilters = { ...filters };
    if (name === 'price') {
      newFilters.priceMin = value[0];
      newFilters.priceMax = value[1];
    } else if (name === 'year') {
      newFilters.yearMin = value[0];
      newFilters.yearMax = value[1];
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-panel">
      <h3>Фильтры</h3>
      <div className="filter-group">
        <label>Коробка передач</label>
        <Select
          isMulti
          options={toSelectOptions(transmissionOptions)}
          value={toSelectOptions(filters.transmission)}
          onChange={(selected) => handleMultiSelectChange(selected, 'transmission')}
          className="react-select-container"
          classNamePrefix="react-select"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 })
          }}
        />
      </div>
      <div className="filter-group">
        <label>Цвет</label>
        <Select
          isMulti
          options={toSelectOptions(colorOptions)}
          value={toSelectOptions(filters.color)}
          onChange={(selected) => handleMultiSelectChange(selected, 'color')}
          className="react-select-container"
          classNamePrefix="react-select"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 })
          }}
        />
      </div>
      <div className="filter-group">
        <label>Тип кузова</label>
        <Select
          isMulti
          options={toSelectOptions(bodyTypeOptions)}
          value={toSelectOptions(filters.bodyType)}
          onChange={(selected) => handleMultiSelectChange(selected, 'bodyType')}
          className="react-select-container"
          classNamePrefix="react-select"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 })
          }}
        />
      </div>
      <div className="filter-group">
        <label>Тип топлива</label>
        <Select
          isMulti
          options={toSelectOptions(engineTypeOptions)}
          value={toSelectOptions(filters.engineType)}
          onChange={(selected) => handleMultiSelectChange(selected, 'engineType')}
          className="react-select-container"
          classNamePrefix="react-select"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          styles={{
            menuPortal: base => ({ ...base, zIndex: 9999 })
          }}
        />
      </div>

      <div className="filter-group">
        <label>Цена (₽)</label>
        <Slider
          min={minMaxValues.priceMin}
          max={minMaxValues.priceMax}
          range
          step={1000}
          value={[filters.priceMin, filters.priceMax]}
          onChange={(value) => handleSliderChange(value, 'price')}
          // marks={{
          //   [minMaxValues.priceMin]: `${minMaxValues.priceMin}`,
          //   [minMaxValues.priceMax]: `${minMaxValues.priceMax}`,
          // }}
        />
        <div className="slider-value">
          <span>{filters.priceMin}₽</span> - <span>{filters.priceMax}₽</span>
        </div>
      </div>

      <div className="filter-group">
        <label>Год выпуска</label>
        <Slider
          min={minMaxValues.yearMin}
          max={minMaxValues.yearMax}
          range
          step={1}
          value={[filters.yearMin, filters.yearMax]}
          onChange={(value) => handleSliderChange(value, 'year')}
          // marks={{
          //   [minMaxValues.yearMin]: `${minMaxValues.yearMin}`,
          //   [minMaxValues.yearMax]: `${minMaxValues.yearMax}`,
          // }}
        />
        <div className="slider-value">
          <span>{filters.yearMin}</span> - <span>{filters.yearMax}</span>
        </div>
      </div>

      <div className="filter-group">
        <label>Максимальный пробег (км)</label>
        <input type="number" name="mileageMax" placeholder="До" value={filters.mileageMax} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default FilterPanel