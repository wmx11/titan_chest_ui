import React from 'react';

function DarkBox({ className, children, withBorder, withHover }) {
  return (
    <div
      className={`${className} items-center bg-slate-900/70 rounded-md border ${
        withBorder ? 'border-titano-pink/40' : 'border-slate-900/80'
      }  ${
        withHover
          ? 'hover:shadow-titano-pink/10 hover:border-titano-pink/80'
          : ''
      } shadow-xl py-5 px-3 md:p-5 transition`}
    >
      {children}
    </div>
  );
}

export default DarkBox;
