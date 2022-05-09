import React from 'react';

function Heading({ children }) {
  return (
    <th className="border-b dark:border-slate-600 font-medium px-6 py-3 text-slate-900 dark:text-slate-200 text-left">
      {children}
    </th>
  );
}

export default Heading;
