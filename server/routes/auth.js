import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js'
import { validationResult } from 'express-validator';
import { registerValidation } from '../validations/reg.js';

const router = express.Router();

export default router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const type = "standart"; // Тип юзера на данный момент

  try {
    res.status(200).send("Авторизация")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});