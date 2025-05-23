import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import cors from 'cors';
import path from 'path';

import CarCardRoutes from './routes/carCard.js';
import AdminCarCard from "./routes/adminCarCard.js";
import RegisterRoutes from './routes/register.js';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import favoritesRoutes from './routes/favorites.js';
import addCarRoutes from './routes/addCar.js';

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


app.use('/api/cars', CarCardRoutes);
app.use('/reg', RegisterRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/adminCarCard', AdminCarCard)
app.use('/add-car', addCarRoutes);

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

// Запрос на админ карточку машины
app.get("/adminCarCard", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
});

// Запрос на добавление новой машины 
app.get("/add-car", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
});

// Запрос на страницу профиля
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
});


// Обработка динамических маршрутов для автомобилей
app.get('/car/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/car/:carId', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Запускаем веб сервер
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
