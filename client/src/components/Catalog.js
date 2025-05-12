import React, { useState, useEffect } from 'react';
import axios from "axios";
import CarCard from './CarCard';
import '../styles/Catalog.css';

const Catalog = ({ filters }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('/api/cars', { params: filters });
        setCars(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке автомобилей:', err);
      }
    };

    fetchCars();
  }, [filters]);

  return (
    <div className="car-catalog">
      {cars.length > 0 ? (
        cars.map(car => <CarCard key={car._id} car={car} />)
      ) : (
        <p>Тут пусто</p>
      )}
    </div>
  );
};

export default Catalog;
