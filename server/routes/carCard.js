import express from 'express';
import CarModel from '../models/Car.js';

const router = express.Router();

// Получение всех автомобилей
router.get('/', async (req, res) => {
  try {
    const filters = {};

    // Универсальный фильтр для массивов
    const arrayFilters = ['transmission', 'color', 'bodyType', 'engineType'];
    arrayFilters.forEach((field) => {
      const value = req.query[field];
      if (value) {
        if (Array.isArray(value)) {
          filters[field] = { $in: value };
        } else {
          filters[field] = value;
        }
      }
    });

    // Числовые диапазоны
    if (req.query.priceMin || req.query.priceMax) {
      filters.price = {};
      if (req.query.priceMin) filters.price.$gte = Number(req.query.priceMin);
      if (req.query.priceMax) filters.price.$lte = Number(req.query.priceMax);
    }

    if (req.query.yearMin || req.query.yearMax) {
      filters.year = {};
      if (req.query.yearMin) filters.year.$gte = Number(req.query.yearMin);
      if (req.query.yearMax) filters.year.$lte = Number(req.query.yearMax);
    }

    if (req.query.mileageMax) {
      filters.mileage = { $lte: Number(req.query.mileageMax) };
    }

    const cars = await CarModel.find(filters);
    res.status(200).json(cars);
  } catch (err) {
    console.error('Ошибка при фильтрации автомобилей:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: 'Автомобиль не найден',
      });
    }

    res.status(200).json(car);
  } catch (err) {
    console.error(`Ошибка при получении автомобиля с ID ${req.params.id}:`, err);
    res.status(500).json({
      message: 'Не удалось получить автомобиль',
      error: err.message,
    });
  }
});

export default router