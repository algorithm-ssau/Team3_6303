import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarMainInfo from '../components/CarMainInfo';
import HeaderC from '../components/HeaderC';
import FooterC from '../components/FooterC';
import ChatWidget from '../components/ChatWidget';
import '../styles/CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const userId = "user-" + Math.random().toString(36).substr(2, 9); // Generate random user ID

  useEffect(() => {
    axios.get(`http://localhost:4000/api/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!car) return <div>Загрузка...</div>;

  return (
    <div className="page-wrapper">
      <HeaderC />
      <main className="main-content">
        <div className="car-detail-container">
          <div className="car-detail-left">
            <CarMainInfo car={car} />
          </div>
          <div className="car-detail-right">
            {/* Тут можно добавить блок с кнопкой "в избранное" и т.п. */}
          </div>
        </div>
        <ChatWidget carId={id} userId={userId} />
      </main>
      <FooterC />
    </div>
  );
};

export default CarDetail;
