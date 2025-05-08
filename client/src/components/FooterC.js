import React from 'react';
import { FaPhone, FaGithub, FaVk, FaTelegramPlane } from 'react-icons/fa';
import '../styles/FooterC.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="divider1"></div>
      
      <ul className="social">
        <li id="contacts">
          <a href="#" className="social-link">
            <FaPhone className="icon" />
          </a>
        </li>
        <li>
          <a href="https://github.com/algorithm-ssau/Team3_6303" className="social-link">
            <FaGithub className="icon" />
          </a>
        </li>
        <li>
          <a href="https://vk.com/" className="social-link">
            <FaVk className="icon" />
          </a>
        </li>
        <li>
          <a href="https://t.me/" className="social-link">
            <FaTelegramPlane className="icon" />
          </a>
        </li>
      </ul>
      
      <div className="divider2"></div>
      
      <ul className="menu">
        <li>
          <a href="#">Главная</a>
        </li>
        <li>
          <a href="#">О проекте</a>
        </li>
        <li>
          <a href="#">Помощь</a>
        </li>
        <li>
          <a href="#">Разместить рекламу</a>
        </li>
        <li>
          <a href="#">Контакты</a>
        </li>
      </ul>
      
      <div className="divider3"></div>
      
      <p className="copyright">©2025 AutoLambada | Все права защищены</p>
    </footer>
  );
};

export default Footer;