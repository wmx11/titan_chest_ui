import React, { useState } from 'react';
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/outline';
import { PresentationChartLineIcon } from '@heroicons/react/solid';

import NeonCardWrapper from '../NeonCardWrapper';
import NeonText from '../NeonText';
import SmallText from '../SmallText';
import PopoverTooltip from '../Layouts/titanchest/PopoverTooltip';

function StatsTab({ name, value, dayChange, tooltip, type, onChartSelect }) {
  return (
    value && (
      <NeonCardWrapper>
        <NeonText>{value}</NeonText>
        <SmallText>{name}</SmallText>
        {dayChange !== undefined && (
          <div className="absolute top-0 right-0 flex justify-between w-full px-2">
            <p className="text-slate-100 text-xs mt-1">24h %</p>
            <p className="text-slate-100 text-xs mt-1">
              {dayChange !== undefined && (
                <strong
                  className={`${
                    dayChange > 0 ? 'text-titano-green' : 'text-titano-pink'
                  } flex items-center`}
                >
                  {dayChange > 0 ? (
                    <TrendingUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {dayChange.toFixed(2)}%
                </strong>
              )}
            </p>
          </div>
        )}
        <div className="absolute bottom-1 right-0 flex justify-between w-full px-2">
          <PopoverTooltip tooltip={tooltip} />
          {dayChange !== undefined && (
            <div className="text-slate-100 text-xs mt-1">
              <PresentationChartLineIcon
                className="h-6 w-6 md:h-4 md:w-4 cursor-pointer"
                onClick={() => onChartSelect(type, name)}
              />
            </div>
          )}
        </div>
      </NeonCardWrapper>
    )
  );
}

export default StatsTab;
