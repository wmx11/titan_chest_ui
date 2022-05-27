import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/outline';
import {
  InformationCircleIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/solid';
import { Tooltip } from '@mantine/core';

function StatsTab({ name, value, dayChange, tooltip, type, onChartSelect }) {
  return (
    value && (
      <>
        <div className="border-titano-pink relative border-2 rounded-md flex-grow md:flex-grow-0 w-full md:w-64 py-7 flex flex-col items-center md:mr-6 mb-6 shadow-lg shadow-titano-pink/30">
          <div className="text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)] text-xl tracking-wider">
            {value}
          </div>
          <p className="text-slate-100 text-xs mt-1">{name}</p>
          {dayChange && (
            <div className="absolute top-0 right-0 flex justify-between w-full px-2">
              <p className="text-slate-100 text-xs mt-1">24h %</p>
              <p className="text-slate-100 text-xs mt-1">
                {dayChange && (
                  <strong
                    className={`${
                      dayChange > 0 ? 'text-titano-green' : 'text-titano-pink'
                    } flex items-center`}
                  >
                    {dayChange > 0 ? (
                      <TrendingUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {dayChange.toFixed(2)}%
                  </strong>
                )}
              </p>
            </div>
          )}
          <div className="absolute bottom-1 right-0 flex justify-between w-full px-2">
            <div className="text-slate-100 text-xs mt-1">
              <Tooltip
                label={tooltip}
                withArrow
                styles={{
                  body: { background: '#DC02DF', fontWeight: 'bold' },
                  arrow: { background: '#DC02DF' },
                }}
                wrapLines={true}
                width="200px"
                allowPointerEvents={true}
              >
                <InformationCircleIcon className="h-4 w-4" />
              </Tooltip>
            </div>
            {dayChange && (
              <div className="text-slate-100 text-xs mt-1">
                <PresentationChartLineIcon
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => onChartSelect(type, name)}
                />
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
}

export default StatsTab;
