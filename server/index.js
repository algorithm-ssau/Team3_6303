import express from "express"; // Библиотека для запуска веб-сервера на твоей машине
import mongoose from "mongoose"; // Библиотека для подключения к БД
import dotenv from "dotenv"; // .env
import { fileURLToPath } from 'url';
import cors from 'cors'; // CORS
import path from 'path';

import RegisterRoutes from './routes/registration.js';
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Определяем наш .env

// Подключаемся к созданной нами базе данных MongoDB
mongoose
  .connect(
    process.env.DB_LINK
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(cors());

app.use('/registration', RegisterRoutes);

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

// Запускаем веб сервер
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
