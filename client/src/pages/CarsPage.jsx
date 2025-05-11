import React, { useState, useEffect, useCallback } from 'react';
import FilterPanel from '../components/FilterPanel';
import CarCard     from '../components/CarCard';
import { fetchCars } from '../utilits/carService';

export default function CarsPage() {
  const [cars, setCars] = useState([]);

  const load = useCallback(params =>
    fetchCars(params).then(({ data }) => setCars(data)),
  []);

  useEffect(() => load(), [load]);

  const onFilterChange = f => {
    const params = {};
    Object.entries(f).forEach(([k, arr]) => {
      if (arr.length) params[k] = arr.join(',');
    });
    load(params);
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Подбор авто</h1>

      <FilterPanel onChange={onFilterChange} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {cars.map(car => <CarCard key={car._id} car={car} />)}
      </div>
    </div>
  );
}
