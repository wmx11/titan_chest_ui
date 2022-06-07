import React from 'react';

function DarkBox({ className, children }) {
  return (
    <div
      className={`${className} items-center bg-slate-900/70 rounded-md border border-slate-900/80 shadow-xl p-5`}
    >
      {children}
    </div>
  );
}

export default DarkBox;
