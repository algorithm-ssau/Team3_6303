import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import { validationResult } from 'express-validator';
import { registerValidation } from '../validations/reg.js';

const router = express.Router();

router.post('/register', registerValidation, async (req, res) => {
  // 1. Валидация данных
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nickname, email, phone_number, password } = req.body;

  try {
    // 2. Проверка на существующего пользователя
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

    // 3. Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Создание нового пользователя
    const newUser = new UserModel({
      nickname,
      email,
      phone_number,
      passwordHash,
      type: false, // стандартный тип пользователя
    });

    // 5. Сохранение пользователя в БД
    await newUser.save();

    // 6. Генерация JWT токена
    // const token = jwt.sign(
    //   { userId: newUser._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '24h' } // токен на 24 часа
    // );

    // 7. Успешный ответ
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