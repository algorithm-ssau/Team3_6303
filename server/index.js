import express from "express"; // Библиотека для запуска веб-сервера на твоей машине
import jwt from "jsonwebtoken"; // Хеширование паролей
import mongoose from "mongoose"; // Библиотека для подключения к БД
import dotenv from "dotenv"; // .env
import bcrypt from 'bcrypt'; // Добавляем библиотеку шифрования
import { validationResult } from "express-validator"; // Эта функция проверяет, есть ли ошибки при валидации запросов


import { registerValidation } from "./validations/reg.js"; // Это валидатор нашего запроса на регистрацию

import UserModel from './models/User.js'

dotenv.config(); // Определяем наш .env

// Подключаемся к созданной нами базе данных MongoDB
mongoose
  .connect(
    process.env.DB_LINK // Берем переменную из .env
  )
  .then(() => console.log("DB ok")) // Если мы не словили инсульт, то выводим это
  .catch((err) => console.log("DB error", err)); // Если словили инсульт...

const app = express(); // Создаём express приложение

app.use(express.json()); // Позволяет читать JSON которые нам приходят с клиента

// Дефолт запрос на основную страницу
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Запрос авторизации с проверкой валидации запроса
app.post("/auth/registration", registerValidation, async (req, res) => {
  const errors = validationResult(req); // Записываем ошибки валидации

  // Если ошибки есть, то возвращаем все, что смогли провалидировать
  if (!errors.isEmpty()) {
    return res.status(400).json(error.array());
  }

  const password = req.body.password; // Забираем пароль
  const salt = await bcrypt.genSalt(10); // Генерируем соль для шифра
  const passwordHash = await bcrypt.hash(password, salt); // Хешируем нахуй

  // Создаём так скажем документ, в котором хранится информация о юзере
  const doc = new UserModel({
    email: req.body.email,
    passwordHash,
  });

  const user = await doc.save(); // Сохраняем наш документ в БД
  
  res.json({
    success: true,
  });
});

// Запускаем веб сервер
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
