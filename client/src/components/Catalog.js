import React, { useState, useEffect } from 'react';
import axios from "axios";
import CarCard from './CarCard';
import '../styles/Catalog.css';

const Catalog = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/carCard/')
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="car-catalog">
      {cars.map(car => (
        <CarCard car={car} />
      ))}
    </div>
  );
};

export default Catalog;