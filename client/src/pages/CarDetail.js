import { useParams, useNavigate } from 'react-router-dom';
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
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Получение данных об автомобиле (это делаем в любом случае)
    axios.get(`http://194.87.146.152/api/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => console.error(err));
      
    // Проверка авторизации
    try {
      const userDataStr = localStorage.getItem('userData');
      
      
      if (!userDataStr) {
        console.log('Нет данных в localStorage');
        setUserId(null);
        return;
      }
      
      const userData = JSON.parse(userDataStr);
      
      if (userData && userData._id) {
        console.log('Пользователь авторизован, ID:', userData._id);
        setUserId(userData._id);
      } else {
        console.log('Отсутствует _id в userData');
        setUserId(null);
      }
    } catch (error) {
      console.error('Ошибка при проверке авторизации:', error);
      setUserId(null);
    }
  }, [id, navigate]);

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
