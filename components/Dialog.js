import { Dialog as DialogElement } from '@mantine/core';
import React from 'react';

function Dialog(props) {
  return (
    <DialogElement
      {...props}
      classNames={{
        root: 'bg-slate-900 border-titano-pink shadow-lg shadow-titano-pink/20',
        closeButton: 'text-white text-lg hover:bg-slate-800',
      }}
    >
      {props.children}
    </DialogElement>
  );
}

export default Dialog;
