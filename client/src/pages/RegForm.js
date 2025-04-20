import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthForm.css';

const RegForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    if (password.length < 7) {
      alert('Пароль должен состоять хотя бы из 8 символов!');
      return;
    }
    
    const formData = { name, email, phone, password };
    console.log('Данные регистрации:', formData);
    alert('Регистрация успешна!');
    // Здесь будет логика регистрации
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Регистрация</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Номер телефона</label>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Придумайте пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
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