import React from 'react';
import { NumberInput as Number } from '@mantine/core';

function NumberInput({
  value,
  label,
  onChange,
  parser,
  formatter,
  max,
  precision,
  defaultValue,
  decimalSeparator,
  placeholder,
}) {
  return (
    <Number
      defaultValue={defaultValue}
      value={value}
      classNames={{
        input:
          'p-5 rounded-md bg-slate-800/90 text-white border border-transparent focus:border-titano-green',
        label: 'text-white',
      }}
      variant="unstyled"
      label={label}
      onChange={onChange}
      hideControls
      parser={parser}
      formatter={formatter}
      max={max}
      precision={precision}
      decimalSeparator={decimalSeparator}
      placeholder={placeholder}
    />
  );
}

export default NumberInput;
