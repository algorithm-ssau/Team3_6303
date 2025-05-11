import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const OPTIONS = {
  transmission: ['автомат','механика','робот','вариатор'],
  color:        ['черный','серебристый','белый','серый','синий','красный','зеленый','коричневый','другого цвета'],
  bodyType:     ['хэтчбек','универсал','седан','купе','внедорожник','фургон','пикап','лимузин','кабриолет'],
  engineType:   ['бензин','дизель','гибрид','электро','газ'],
};

export default function FilterPanel({ onChange }) {
  const [filters, setFilters] = useState({
    transmission: [], color: [], bodyType: [], engineType: []
  });

  const handle = field => values =>
    setFilters(f => ({ ...f, [field]: values.map(v => v.value) }));

  useEffect(() => onChange(filters), [filters, onChange]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Object.entries(OPTIONS).map(([key, opts]) => (
        <Select
          key={key}
          isMulti
          placeholder={key}
          options={opts.map(v => ({ value: v, label: v }))}
          onChange={handle(key)}
        />
      ))}
    </div>
  );
}
