import React, { forwardRef } from 'react';

const Container = forwardRef(({ children, className }, ref) => {
  return (
    <div
      className={`container mx-auto p-4 ${className && className}`}
      ref={ref}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

export default Container;
