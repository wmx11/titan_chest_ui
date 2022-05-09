import React from 'react';

function StatsTab({ name, value }) {
  return (
    <div className="cursor-pointer border-titano-pink border-2 rounded-md flex-grow md:flex-grow-0 w-1/2 md:w-1/3 lg:w-1/6 py-7 flex flex-col items-center mr-4 mb-4 shadow-lg shadow-titano-pink/20">
      <p className="text-titano-green drop-shadow-[0px_0px_4px_rgb(0,253,213)] text-xl">
        {value}
      </p>
      <p className="text-slate-100 text-sm">{name}</p>
    </div>
  );
}

export default StatsTab;
