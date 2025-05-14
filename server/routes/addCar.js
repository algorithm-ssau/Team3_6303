// server/routes/addCar.js
import express from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Car from '../models/Car.js';
import UserModel from '../models/User.js';
import { addCarValidation } from '../validations/addCarValidation.js';

const router = express.Router();

// Middleware для проверки авторизации
const authenticate = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    
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

// Middleware для проверки прав администратора
const checkAdmin = (req, res, next) => {
  if (req.user.type !== true) {
    return res.status(403).json({ message: 'Требуются права администратора' });
  }
  next();
};

// Роут для добавления автомобиля
router.post('/', authenticate, checkAdmin, addCarValidation, async (req, res) => {
  try {
    // Проверка валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array(),
        message: 'Некорректные данные при добавлении автомобиля'
      });
    }

    // Получаем данные из тела запроса
    const { 
      photos, 
      price, 
      brand, 
      model, 
      transmission, 
      color, 
      year, 
      bodyType, 
      engineType, 
      engineVolume, 
      enginePower, 
      mileage, 
      additionalInfo 
    } = req.body;
    
    // Дополнительная проверка на сервере (на всякий случай)
    if (price <= 0) {
      return res.status(400).json({ 
        message: 'Цена должна быть положительным числом' 
      });
    }
    
    // Создаем новый автомобиль
    const car = new Car({
      photos: photos.filter(photo => photo.trim() !== ''),
      price: Number(price),
      brand,
      model,
      transmission,
      color,
      year: Number(year),
      bodyType,
      engineType,
      engineVolume: Number(engineVolume),
      enginePower: Number(enginePower),
      mileage: Number(mileage),
      additionalInfo,
      createdBy: req.user._id
    });

    // Сохраняем в базу данных
    await car.save();

    res.status(201).json({ 
      message: 'Автомобиль успешно добавлен', 
      car 
    });
  } catch (error) {
    console.error('Ошибка при добавлении автомобиля:', error);
    res.status(500).json({ message: 'Ошибка сервера при добавлении автомобиля' });
  }
});

export default router;