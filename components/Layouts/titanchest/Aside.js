import React, { useState } from 'react';
import MenuLink from './MenuLink';

function Aside() {
  const [isOpen, setIsOpen] = useState(true);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`backdrop-blur-3xl bg-slate-800/50 min-h-screen px-3 py-6 hidden md:block shadow-xl shadow-titano-green/10 relative z-10 ${
        isOpen ? 'w-60' : 'w-20'
      }`}
    >
      {/* <button
        className="bg-red-100 absolute top-0 right-0 cursor-pointer z-10"
        onClick={handleOnClick}
      >
        Close
      </button> */}
      <div className="px-4">
        <p className="text-white mb-4 text-2xl">Titan Chest</p>
      </div>
      <div>
        <ul className="text-xs">
          <MenuLink href="/">Home</MenuLink>
          <MenuLink href="/trading-chart">Trading Chart</MenuLink>
        </ul>
      </div>
    </div>
  );
}

export default Aside;
