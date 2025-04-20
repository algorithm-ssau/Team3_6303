import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import { validationResult } from 'express-validator';
import { registerValidation } from '../validations/reg.js';

const router = express.Router();

router.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nickname, email, phone_number, password } = req.body;

  try {
    const existingUserByMail = await UserModel.findOne( { email } );
    if (existingUserByMail) {
      return res.status(400).json({
        message: 'Пользователь с таким email уже существует'
      });
    }
    const existingUserByPhone = await UserModel.findOne({ phone_number });
    if (existingUserByPhone) {
      return res.status(400).json({
        message: 'Пользователь с таким телефоном уже существует'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      nickname,
      email,
      phone_number,
      passwordHash,
      type: false, // стандартный тип пользователя
    });

    await newUser.save();

    // Генерация JWT токена
    // const token = jwt.sign(
    //   { userId: newUser._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '24h' } // токен на 24 часа
    // );

    res.status(201).json({
      // token,
      user: {
        id: newUser._id,
        nickname: newUser.nickname,
        email: newUser.email,
        phone_number: newUser.phone_number,
        type: newUser.type
      },
      message: 'Регистрация прошла успешно!'
    });

  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
});

export default router;