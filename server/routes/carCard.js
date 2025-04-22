import express from 'express';
import CarModel from '../models/Car.js';
import { validationResult } from 'express-validator';


const router = express.Router();

export default router.get('/:id', async (req, res) => {
    try {
      const car = await CarModel.findById(req.params.id);
      
      if (!car) {
        return res.status(404).json({
          message: 'Автомобиль не найден'
        });
      }
      
      res.json(car);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Не удалось получить автомобиль'
      });
    }
});