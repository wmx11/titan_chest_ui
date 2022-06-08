import { Accordion as AccordionComponent } from '@mantine/core';
import React from 'react';

function Accordion({ children }) {
  return (
    <AccordionComponent
      classNames={{
        item: 'hover:border-titano-green transition',
        control: 'hover:bg-slate-900/80 transition rounded-md',
        label: 'text-white',
        icon: 'text-white',
      }}
    >
      {children}
    </AccordionComponent>
  );
}

export default Accordion;
