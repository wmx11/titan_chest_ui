import React from 'react';
import { TextInput as Text } from '@mantine/core';

function TextInput({ value, label, onChange, defaultValue, error }) {
  return (
    <Text
      defaultValue={defaultValue}
      value={value}
      classNames={{
        input:
          'p-5 rounded-md bg-slate-800/90 text-white border border-transparent focus:border-titano-green',
        label: 'text-white',
        error: 'text-titano-pink',
        invalid: '!border-titano-pink',
      }}
      variant="unstyled"
      label={label}
      onChange={onChange}
      error={error}
    />
  );
}

export default TextInput;
