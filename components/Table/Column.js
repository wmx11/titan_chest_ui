import React from 'react';

function Column({ children, className }) {
  return (
    <td
      className={`border-b border-slate-100 dark:border-slate-700 px-6 py-3 text-slate-500 dark:text-slate-400 ${className}`}
    >
      {children}
    </td>
  );
}

export default Column;
