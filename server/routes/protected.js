import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const router = express.Router();

// Express-прослойка для аутентификации
const authenticate = async (req, res, next) => {
  try {
      const token = (req.headers.authorization || '').replace('Bearer ', '');
      console.log('Received token:', token); // Логирование токена

      if (!token) {
          return res.status(403).json({ message: 'Требуется авторизация' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded._id);

      if (!user) {
          return res.status(403).json({ message: 'Пользователь не найден' });
      }

      req.user = user;
      next();
  } catch (err) {
      console.error('Authentication error:', err);
      res.status(403).json({ message: 'Ошибка авторизации' });
  }
};

// Получение данных текущего пользователя
router.get('/me', authenticate, async (req, res) => {
    try {
      const user = req.user.toObject();
      delete user.passwordHash;
      
      res.json({
        ...user,
        isAdmin: user.type
      });
    } catch (err) {
      console.error('Get user error:', err);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });
// Express-прослойка для проверки админа
const checkAdmin = (req, res, next) => {
  if (req.user.type !== true) {
    return res.status(403).json({ message: 'Требуются права администратора' });
  }
  next();
};

// Защищенный роут - только для авторизованных
router.get('/profile', authenticate, (req, res) => {
  res.json({ 
    message: 'Добро пожаловать в профиль',
    user: {
      _id: req.user._id,
      email: req.user.email,
      isAdmin: req.user.type
    }
  });
});

// Защищенный роут - только для админов
router.post('/add-car', authenticate, checkAdmin, (req, res) => {
  res.json({ message: 'Машина успешно добавлена' });
});

export default router;
