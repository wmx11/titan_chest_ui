import React from 'react';

function NeonCardWrapper({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={`${className} border-titano-pink relative border-2 rounded-md flex-grow md:flex-grow-0 w-full md:w-64 py-7 flex flex-col items-center md:mr-4 mb-4 shadow-lg shadow-titano-pink/30 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {children}
    </div>
  );
}

export default NeonCardWrapper;
