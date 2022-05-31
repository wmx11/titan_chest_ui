import React from 'react';

function DarkBox({ className, children }) {
  return (
    <div
      className={`${className} items-center bg-slate-900/50 rounded-md shadow-lg p-5`}
    >
      {children}
    </div>
  );
}

export default DarkBox;
