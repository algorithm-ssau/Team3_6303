// import React, { useEffect, useState, useCallback } from 'react';
// import FilterPanel from '../components/FilterPanel';   // убедитесь, что путь верный
// import CarCard     from '../components/CarCard';
// import { fetchCars } from '../utilits/carService';

// export default function CarsPage() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const load = useCallback((params = {}) => {
//     setLoading(true);
//     fetchCars(params)
//       .then(({ data }) => setCars(data))
//       .finally(() => setLoading(false));
//   }, []);

//   // начальная загрузка — без фильтров
//   useEffect(() => { load(); }, [load]);

//   // коллбэк приходит из FilterPanel
//   const handleFilter = (f) => {
//     const params = {};
//     Object.entries(f).forEach(([k, arr]) => {
//       if (arr.length) params[k] = arr.join(',');
//     });
//     load(params);
//   };

//   return (
//     <div style={{ padding: '24px' }}>
//       <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Подбор авто</h1>

//       {/* ФИЛЬТРЫ — ВСЕГДА ВИДНЫ */}
//       <FilterPanel onChange={handleFilter} />

//       {/* СПИСОК / ЗАГЛУШКА */}
//       {loading ? (
//         <p style={{ marginTop: '24px' }}>Загрузка…</p>
//       ) : cars.length === 0 ? (
//         <p style={{ marginTop: '24px', color: '#666' }}>
//           Нет машин под выбранные параметры
//         </p>
//       ) : (
//         <div
//           style={{
//             display: 'grid',
//             gap: '24px',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
//             marginTop: '24px',
//           }}
//         >
//           {cars.map((c) => (
//             <CarCard key={c._id} car={c} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
export default function CarsPage() {
  return (
    <div style={{ padding: 40, fontSize: 32 }}>
      TEST-PAGE
    </div>
  );
}
