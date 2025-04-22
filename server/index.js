import express from "express"; // Библиотека для запуска веб-сервера на твоей машине
import mongoose from "mongoose"; // Библиотека для подключения к БД
import dotenv from "dotenv"; // .env
import { fileURLToPath } from 'url';
import cors from 'cors'; // CORS
import path from 'path';

import RegisterRoutes from './routes/registration.js';
import CarCardRoutes from './routes/carCard.js';
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(cors()); // Настраиваем CORS

app.use('/registration', RegisterRoutes);
app.use('/carCard', CarCardRoutes)

// Дефолт запрос на основную страницу
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
});

// Запрос на страницу регистрации
app.get("/reg", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
});

// Запрос на страницу авторизации
app.get("/auth", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
});

// Запрос на карточку машины
app.get("/carCard", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
});

// Запускаем веб сервер
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
