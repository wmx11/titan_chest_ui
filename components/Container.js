import React from 'react';

function Container({ children, className }) {
  return (
    <div className={`container mx-auto p-4 ${className && className}`}>
      {children}
    </div>
  );
}

export default Container;
