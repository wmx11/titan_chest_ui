import React from 'react';

function NeonText({ children, className, type = 'green' }) {
  const shadowType =
    type === 'green'
      ? 'drop-shadow-[0px_0px_3px_rgb(0,253,213)]'
      : 'drop-shadow-[0px_0px_4px_rgb(220,2,223)]';
  return (
    <div
      className={`text-titano-${type} ${shadowType} text-xl tracking-wider break-words ${className}`}
    >
      {children}
    </div>
  );
}

export default NeonText;
