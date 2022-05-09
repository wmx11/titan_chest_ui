import React from 'react';

function Heading({ children, className }) {
  return <h1 className={`text-3xl mb-4 font-bold ${className}`}>{children}</h1>;
}

export default Heading;
