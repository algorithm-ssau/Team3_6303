import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js'
import { validationResult } from 'express-validator';
import { registerValidation } from '../validations/reg.js';

const router = express.Router();

export default router.post('/', registerValidation, async (req, res) => {
  const errors = validationResult(req); // Записываем ошибки валидации
  
  // Если ошибки есть, то возвращаем все, что смогли провалидировать
  if (!errors.isEmpty()) {
    return res.status(400).json(error.array());
  }

  const { email, password } = req.body;
  const type = "standart"; // Тип юзера на данный момент

  try {
    // let user = await UserModel.findOne({ email });
    // if (user) return res.status(400).json({ msg: 'User already exists' });

    // user = new User({ email, password, type });

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);

    // await user.save();

    // const payload = { userId: user._id };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // res.json({ token });
    res.status(200).send("Регистрация")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});