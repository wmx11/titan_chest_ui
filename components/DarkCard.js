import React from 'react';
import DarkBox from './DarkBox';

function DarkCard({ Head, Body }) {
  return (
    <DarkBox className="text-white flex items-center justify-center md:w-[100%] flex-wrap h-full">
      {Head}
      <DarkBox className="bg-titano-pink/5 flex-1 min-w-[180px]">
        {Body}
      </DarkBox>
    </DarkBox>
  );
}

export default DarkCard;
