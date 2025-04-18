import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema(
  {
    photos: {
      type: [String], // массив ссылок на фото
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      enum: ['автомат', 'механика', 'робот', 'вариатор'],
      required: true,
    },
    color: {
      type: String,
      enum: [
        'черный',
        'серебристый',
        'белый',
        'серый',
        'синий',
        'красный',
        'зеленый',
        'коричневый',
        'другого цвета',
      ],
      required: true,
    },
    year: {
      type: Number,
      min: 1960,
      max: new Date().getFullYear(),
      required: true,
    },
    bodyType: {
      type: String,
      enum: [
        'хэтчбек',
        'универсал',
        'седан',
        'купе',
        'внедорожник',
        'фургон',
        'пикап',
        'лимузин',
        'кабриолет',
      ],
      required: true,
    },
    engineType: {
      type: String,
      enum: ['бензин', 'дизель', 'гибрид', 'электро', 'газ'],
      required: true,
    },
    engineVolume: {
      type: Number, // литры
      required: true,
    },
    enginePower: {
      type: Number, // в л.с.
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    additionalInfo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Car', CarSchema);
