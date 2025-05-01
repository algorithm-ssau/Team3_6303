// src/components/FilterPanel.jsx
import React, { useState } from 'react';
import {
  TRANSMISSIONS,
  COLORS,
  BODIES,
  FUELS,
} from '../constants/filters';

export default function FilterPanel({ onChange }) {
  const [state, setState] = useState({
    transmission: new Set(),
    color:       new Set(),
    body:        new Set(),
    fuel:        new Set(),
  });

  const toggle = (group, value) => {
    const next = new Set(state[group]);
    next.has(value) ? next.delete(value) : next.add(value);
    const updated = { ...state, [group]: next };
    setState(updated);
    onChange(updated);
  };

  const renderEnum = (label, group, options) => (
    <fieldset className="mb-4">
      <legend className="font-medium mb-2">{label}</legend>
      {options.map(v => (
        <label key={v} className="flex items-center mb-1">
          <input
            type="checkbox"
            checked={state[group].has(v)}
            onChange={() => toggle(group, v)}
            className="mr-2"
          />
          {v}
        </label>
      ))}
    </fieldset>
  );

  return (
    <aside className="w-64 p-4 border-r overflow-auto">
      {renderEnum('Коробка передач', 'transmission', TRANSMISSIONS)}
      {renderEnum('Цвет',            'color',        COLORS)}
      {renderEnum('Тип кузова',      'body',         BODIES)}
      {renderEnum('Тип топлива',    'fuel',         FUELS)}
    </aside>
  );
}
