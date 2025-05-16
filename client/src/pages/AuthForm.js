import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthForm.css'; // лучше так пути не писать

const AuthForm = () => {
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' или 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
  
    try {
      const { data } = await axios.post('http://194.87.146.152:4000/auth', {
        authMethod, // 'phone' или 'email'
        login: authMethod === 'phone' ? phone : email,
        password
      });

      localStorage.setItem('userData', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      if (error.response?.data?.errors) {
        // Обработка ошибок валидации
        setErrors(error.response.data.errors.map(err => err.msg));
      } else {
        setErrors([error.response?.data?.message || 'Ошибка авторизации']);
      }
      console.error('Auth error:', error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Вход в личный кабинет</h2>

        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <div key={index} className="error-message">
                {error}
              </div>
            ))}
          </div>
        )}

        <div className="toggle-buttons">
          <button
            type="button"
            className={`toggle-btn ${authMethod === 'phone' ? 'active' : ''}`}
            onClick={() => {
              setAuthMethod('phone');
              setErrors([]);
            }}
          >
            Через номер телефона
          </button>
          <button
            type="button"
            className={`toggle-btn ${authMethod === 'email' ? 'active' : ''}`}
            onClick={() => {
              setAuthMethod('email');
              setErrors([]);
            }}
          >
            Через почту
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {authMethod === 'phone' ? (
            <div className="auth-form-group">
              <label>Номер телефона</label>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors([]);
                }}
                required
              />
            </div>
          ) : (
            <div className="auth-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors([]);
                }}
              />
            </div>
          )}

          <div className="auth-form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors([]);
              }}
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn-ra"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти в личный кабинет'}
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