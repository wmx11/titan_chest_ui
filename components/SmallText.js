import React from 'react';

function SmallText({ children, className }) {
  return (
    <p className={`text-slate-100 text-xs px-2 mt-1 ${className}`}>{children}</p>
  );
}

export default SmallText;
