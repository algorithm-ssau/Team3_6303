import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthForm.css'; // лучше так пути не писать

const AuthForm = () => {
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' или 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(authMethod === 'phone' ? { phone, password } : { email, password });
    alert('Registration successful!');
    // Здесь будет логика авторизации
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Вход в личный кабинет</h2>
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${authMethod === 'phone' ? 'active' : ''}`}
            onClick={() => setAuthMethod('phone')}
          >
            Через номер телефона
          </button>
          <button
            className={`toggle-btn ${authMethod === 'email' ? 'active' : ''}`}
            onClick={() => setAuthMethod('email')}
          >
            Через почту
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {authMethod === 'phone' ? (
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
          ) : (
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
          )}

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Войти в личный кабинет
          </button>
        </form>

        <div className="auth-footer">
          <span>Ещё нет аккаунта?</span>
          <Link to="/reg" className="register-link">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;