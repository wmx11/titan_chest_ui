import { Switch as SwitchComponent } from '@mantine/core';
import React from 'react';

function Switch({ checked, onChange, label }) {
  return (
    <SwitchComponent
      classNames={{
        input: 'checked:bg-titano-pink checked:border-titano-pink',
        label: 'text-white',
      }}
      checked={checked}
      onChange={onChange}
      label={label}
    />
  );
}

export default Switch;
