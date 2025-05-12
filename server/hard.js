import mongoose from 'mongoose';
import Car from './models/Car.js';
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(
    process.env.DB_LINK
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

// Массив машин для добавления
const carsToAdd = [
  {
    photos: ['https://10.img.avito.st/image/1/1.c1IpH7a437sfth2-Qz5zKl--3b2Xvl2zX7vduZm217Gf.P2HPJJEkGa7GKqeAVz2AxWwW2KZSrLsWstSUQvhPeck', 'https://90.img.avito.st/image/1/1.3spTbLa4ciNlxbAmYz_AsiXNcCXtzfArJchwIePFeinl.HQk-r5-d_PEchZhzsZiIYLsF5Kh3DsVLyOEA7KCFXSE'],
    price: 1500000,
    brand: 'Toyota',
    model: 'Camry',
    transmission: 'автомат',
    color: 'черный',
    year: 2020,
    bodyType: 'седан',
    engineType: 'бензин',
    engineVolume: 2.5,
    enginePower: 249,
    mileage: 35000,
    additionalInfo: 'Полный комплект, один хозяин, без ДТП',
  },
  {
    photos: ['https://90.img.avito.st/image/1/1.8YIl47a4XWsTSp9uS7SilFVCX22bQt9jU0dfaZVKVWGT.XrLi74lBrOsbWgb9PQi3eKjUMyzSXtHVntKP8T3HBB0'],
    price: 800000,
    brand: 'Lada',
    model: 'Vesta',
    transmission: 'механика',
    color: 'белый',
    year: 2018,
    bodyType: 'седан',
    engineType: 'бензин',
    engineVolume: 1.6,
    enginePower: 106,
    mileage: 75000,
    additionalInfo: 'Требуется небольшой ремонт бампера',
  },
  {
    photos: ['https://20.img.avito.st/image/1/1.aKVUVLa4xExi_QZJCC1T0iX1xkrq9UZEIvDGTuT9zEbi.aWJXbpgSeY9SysmZdnXHVGWVBW5Me9jbetECKhjCnH8'],
    price: 3200000,
    brand: 'BMW',
    model: 'X5',
    transmission: 'автомат',
    color: 'серебристый',
    year: 2019,
    bodyType: 'внедорожник',
    engineType: 'дизель',
    engineVolume: 3.0,
    enginePower: 249,
    mileage: 45000,
    additionalInfo: 'Премиум комплектация, кожаный салон',
  },
];

// Функция для сохранения машин
async function seedCars() {
  try {
    // Удаляем все существующие записи (опционально)
    await Car.deleteMany({});
    console.log('Удалены существующие записи автомобилей');
    
    // Добавляем новые машины
    const savedCars = await Car.insertMany(carsToAdd);
    console.log(`Успешно добавлено ${savedCars.length} автомобилей`);
    
    // Закрываем соединение
    mongoose.connection.close();
  } catch (error) {
    console.error('Ошибка при добавлении автомобилей:', error);
    mongoose.connection.close();
  }
}

// Вызываем функцию
seedCars();