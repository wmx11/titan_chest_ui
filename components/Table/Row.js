import React from 'react';

function Row({ children }) {
  return <tr className="hover:bg-slate-100">{children}</tr>;
}

export default Row;
