import { Accordion as AccordionComponent } from '@mantine/core';
import React from 'react';

function Accordion({ children }) {
  return (
    <AccordionComponent
      classNames={{
        control: 'hover:bg-titano-pink/50 transition rounded-md',
        label: 'text-white',
        icon: 'text-white',
      }}
    >
      {children}
    </AccordionComponent>
  );
}

export default Accordion;
