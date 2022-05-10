import React from 'react';

function StatsTab({ name, value }) {
  return (
    <div className="border-titano-pink border-2 rounded-md flex-grow md:flex-grow-0 w-full md:w-1/3 lg:w-1/6 py-7 flex flex-col items-center md:mr-4 mb-4 shadow-lg shadow-titano-pink/30">
      <p className="text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)] text-xl">
        {value}
      </p>
      <p className="text-slate-100 text-sm">{name}</p>
    </div>
  );
}

export default StatsTab;
