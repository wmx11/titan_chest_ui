import React from 'react';
import { Select as SelectInput } from '@mantine/core';

function Select({ label, value, onChange, data, placeholder }) {
  return (
    <SelectInput
      classNames={{
        input:
          'p-5 rounded-md bg-slate-800/90 text-white border border-transparent focus:border-titano-green',
        dropdown: 'bg-slate-800/90 backdrop-blur-sm border-none',
        item: 'text-white',
        hovered: 'bg-slate-700/90',
        selected: 'bg-slate-600/90',
      }}
      label={label}
      value={value}
      onChange={onChange}
      variant="unstyled"
      data={data}
      placeholder={placeholder}
      styles={{
        label: { color: '#fff' },
      }}
    />
  );
}

export default Select;
