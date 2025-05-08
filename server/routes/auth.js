import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import { validationResult } from 'express-validator';
import { loginValidation } from '../validations/auth.js';

const router = express.Router();

router.post('/', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { login, password } = req.body;
    
    const user = await UserModel.findOne({
      $or: [{ email: login }, { phone_number: login }]
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        type: user.type // false - buyer, true - admin
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user.toObject();

    res.json({
      ...userData,
      token,
      isAdmin: user.type // Добавляем флаг isAdmin в ответ
    });

  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ message: 'Ошибка авторизации' });
  }
});

export default router;
