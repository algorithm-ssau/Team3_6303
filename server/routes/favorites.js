import express from 'express';
import Basket from '../models/Basket.js';
import Car from '../models/Car.js';
import { authenticate } from './protected.js'; // Исправленный импорт

const router = express.Router();

// Получение списка избранных машин пользователя
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Находим все записи в корзине для данного пользователя
    const favorites = await Basket.find({ user: userId })
      .populate({
        path: 'car',
        model: 'Car'
      });
    
    // Извлекаем только данные о машинах
    const favoriteCars = favorites.map(item => item.car);
    
    res.json(favoriteCars);
  } catch (err) {
    console.error('Ошибка при получении избранных машин:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Добавление машины в избранное
router.post('/:carId', authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const carId = req.params.carId;
    
    // Проверяем, существует ли машина
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Машина не найдена' });
    }
    
    // Проверяем, не добавлена ли уже машина в избранное
    const existingFavorite = await Basket.findOne({ user: userId, car: carId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Машина уже в избранном' });
    }
    
    // Создаем новую запись в избранном
    const newFavorite = new Basket({
      user: userId,
      car: carId
    });
    
    await newFavorite.save();
    
    res.json({ message: 'Машина добавлена в избранное', car });
  } catch (err) {
    console.error('Ошибка при добавлении в избранное:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удаление машины из избранного
router.delete('/:carId', authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const carId = req.params.carId;
    
    const result = await Basket.findOneAndDelete({ user: userId, car: carId });
    
    if (!result) {
      return res.status(404).json({ message: 'Машина не найдена в избранном' });
    }
    
    res.json({ message: 'Машина удалена из избранного' });
  } catch (err) {
    console.error('Ошибка при удалении из избранного:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;