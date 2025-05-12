import express from 'express';
import CarModel from '../models/Car.js';
import { validationResult } from 'express-validator';
import { carValidation } from '../validations/carValidation.js';

const router = express.Router();

router.post('/', carValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    brand,
    model,
    year,
    price,
    mileage,
    engineVolume,
    enginePower,
    transmission,
    color,
    bodyType,
    engineType,
    photos,
    additionalInfo
  } = req.body;

  try {
    const car = new CarModel({
      brand,
      model,
      year,
      price,
      mileage,
      engineVolume,
      enginePower,
      transmission,
      color,
      bodyType,
      engineType,
      photos,
      additionalInfo
    });

    const savedCar = await car.save();

    res.status(201).json({
      message: 'Автомобиль успешно добавлен',
      car: {
        id: savedCar._id,
        brand: savedCar.brand,
        model: savedCar.model,
        year: savedCar.year,
        price: savedCar.price,
        mileage: savedCar.mileage,
        engineVolume: savedCar.engineVolume,
        enginePower: savedCar.enginePower,
        transmission: savedCar.transmission,
        color: savedCar.color,
        bodyType: savedCar.bodyType,
        engineType: savedCar.engineType,
        photos: savedCar.photos,
        additionalInfo: savedCar.additionalInfo
      }
    });

  } catch (err) {
    console.error('Ошибка при добавлении автомобиля:', err);
    res.status(500).json({
      message: 'Произошла ошибка при добавлении автомобиля',
      error: err.message
    });
  }
});

export default router;
