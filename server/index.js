import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/reg.js";

import UserModel from './models/User.js'

dotenv.config();

// Подключаемся к созданной нами базе данных MongoDB
mongoose
  .connect(
    process.env.DB_LINK
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(express.json()); // Позволяет читать JSON которые нам приходят с клиента

// Дефолт запрос на основную страницу
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Запрос авторизации с проверкой валидации запроса
app.post("/auth/registration", registerValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(error.array());
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    passwordHash,
  });

  const user = await doc.save();
  
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
