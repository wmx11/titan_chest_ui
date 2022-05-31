import React from 'react';

function NeonText({ children }) {
  return (
    <div className="text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)] text-xl tracking-wider break-words">
      {children}
    </div>
  );
}

export default NeonText;
