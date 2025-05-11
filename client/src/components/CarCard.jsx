import React from 'react';

export default function CarCard({ car }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={car.photos?.[0] || '/no-image.png'}
        alt={car.model}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h3 className="font-semibold">{car.brand} {car.model}</h3>
      <p className="text-sm">{car.year} • {car.engineType} • {car.transmission}</p>
      <p className="mt-1 text-lg font-bold">{car.price.toLocaleString()} ₽</p>
    </div>
  );
}
