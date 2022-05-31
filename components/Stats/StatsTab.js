import React, { useState } from 'react';
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/outline';
import {
  InformationCircleIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/solid';
import { Popover } from '@mantine/core';
import NeonCardWrapper from '../NeonCardWrapper';
import NeonText from '../NeonText';
import SmallText from '../SmallText';

function StatsTab({ name, value, dayChange, tooltip, type, onChartSelect }) {
  const [opened, setOpened] = useState(false);

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
            <Popover
              opened={opened}
              target={
                <InformationCircleIcon
                  className="h-6 w-6 md:h-4 md:w-4 cursor-pointer"
                  onClick={() => setOpened(true)}
                />
              }
              onClose={() => setOpened(false)}
              width={260}
              withArrow
              position="top-start"
              withCloseButton
              styles={{
                body: {
                  background: '#DC02DF',
                  fontWeight: 'bold',
                  borderColor: '#DC02DF',
                  color: '#fff',
                },
                arrow: { background: '#DC02DF', borderColor: '#DC02DF' },
                close: { color: '#0F172A' },
              }}
            >
              {tooltip}
            </Popover>
          </div>
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
