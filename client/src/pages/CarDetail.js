import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarMainInfo from '../components/CarMainInfo';
import HeaderC from '../components/HeaderC';
import FooterC from '../components/FooterC';
import Chat from '../components/Chat';
import '../styles/CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

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
          <div className="car-detail-content">
            <CarMainInfo car={car} />
          </div>
        </div>
      </main>
      <Chat carId={id} />
      <FooterC />
    </div>
  );
};

export default CarDetail;
