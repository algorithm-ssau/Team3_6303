import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderC from '../components/HeaderC';
import FooterC from '../components/FooterC';
import CarMainInfo from '../components/CarMainInfo';
import '../styles/CarPage.css';

const CarPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`http://194.87.146.152/cars/${carId}`);
        setCar(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Не удалось загрузить данные автомобиля');
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [carId]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!car) return <div className="error">Автомобиль не найден</div>;

  return (
    <div className="car-page">
      <HeaderC />
      <div className="car-page-content">
        <CarMainInfo car={car} />
      </div>
      <FooterC />
    </div>
  );
};

export default CarPage;