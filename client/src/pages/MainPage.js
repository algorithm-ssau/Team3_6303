import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from '../components/FilterPanel';
import CarCard from '../components/CarCard';
import HeaderC from '../components/HeaderC';
import FooterC from '../components/FooterC';
import '../styles/MainPage.css';

const MainPage = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars', { params: filters });
        console.log('Полученные автомобили:', response.data); // Лог для проверки
        setCars(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке автомобилей:', error);
      }
    };

    fetchCars();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="main-container">
      <HeaderC />
      <div className="page-content">
        <div className="filter-container">
          <FilterPanel onFilterChange={handleFilterChange} />
        </div>
        <div className="car-list">
          {cars.length > 0 ? (
            cars.map((car) => <CarCard key={car._id} car={car} />)
          ) : (
            <p>Тут пусто</p>
          )}
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default MainPage;