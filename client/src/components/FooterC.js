import {  FaGithub, FaVk, FaTelegramPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import '../styles/FooterC.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="divider"></div>
      
      <ul className="social">
        <li>
          <a href="https://github.com/algorithm-ssau/Team3_6303" className="social-link" target="_blank" rel="noopener noreferrer">
            <FaGithub className="icon" />
          </a>
        </li>
        <li>
          <a href="https://vk.com/" className="social-link" target="_blank" rel="noopener noreferrer">
            <FaVk className="icon" />
          </a>
        </li>
        <li>
          <a href="https://t.me/" className="social-link" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className="icon" />
          </a>
        </li>
      </ul>
      
      <div className="divider"></div>
      
      <ul className="menu">
        <li>
          <Link to="/">Главная</Link> 
        </li>
        <li>
          <a href="#">О проекте</a>
        </li>
        <li>
          <a href="#">Разместить рекламу</a>
        </li>
        <li>
          <a href="#">Наши контакты</a>
        </li>
      </ul>
      
      <div className="divider"></div>
      
      <p className="copyright">©2025 AutoLambada | Все права защищены</p>
    </footer>
  );
};

export default Footer;