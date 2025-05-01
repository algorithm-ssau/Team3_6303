// src/pages/CarsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import FilterPanel from '../components/FilterPanel';
import Car from '../components/Car';
import { getCars } from '../api/cars';

export default function CarsPage() {
  const [cars,    setCars]    = useState([]);
  const [filters, setFilters] = useState(null);

  // 1) Загружаем все машины при монтировании
  useEffect(() => {
    getCars().then(setCars).catch(console.error);
  }, []);

  // 2) Фильтруем в памяти
  const filteredCars = useMemo(() => {
    if (!filters) return cars;

    return cars.filter(car => {
      const ok = (group, value) =>
        !filters[group].size || filters[group].has(value);

      return (
        ok('transmission', car.transmission) &&
        ok('color',        car.color) &&
        ok('body',         car.body) &&
        ok('fuel',         car.fuel)
        // сюда можно добавить проверки любых других полей из Car.js
      );
    });
  }, [cars, filters]);

  return (
    <div className="flex min-h-screen">
      <FilterPanel onChange={setFilters} />

      <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map(car => (
          <Car key={car.id} {...car} />
        ))}
      </main>
    </div>
  );
}
