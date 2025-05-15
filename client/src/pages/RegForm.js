import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthForm.css';

const RegForm = () => {
  const [nickname, setName] = useState('');
  const [phone_number, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    
    try {
      const response = await axios.post('http://194.87.146.152:4000/reg/register', {
        nickname, email, phone_number, password
      });
      
      localStorage.setItem('token', response.data.token);
      alert(response.data.message);
      window.location.href = '/';
      
    } catch (error) {
      if (error.response?.data?.errors) {
        // Обработка ошибок валидации
        const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
        console.error('Ошибка валидации:', error.response?.data);
        alert(errorMessages);
      } else {
        alert(error.response?.data?.message || 'Ошибка регистрации');
        console.error('Ошибка:', error.response?.data);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Регистрация</h2>

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Имя пользователя</label>
            <input
              type="text"
              placeholder="Ваше имя"
              value={nickname}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Номер телефона</label>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Придумайте пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Подтвердите пароль</label>
            <input
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Зарегистрироваться
          </button>
        </form>

        <div className="auth-footer">
          <span>Уже есть аккаунт?</span>
          <Link to="/auth" className="register-link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegForm;