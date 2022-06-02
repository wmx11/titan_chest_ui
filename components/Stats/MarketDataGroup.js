import { format } from 'date-fns';
import React from 'react';
import Heading from '../Heading';
import StatsTabsGroup from './StatsTabsGroup';
import { ChartDots3 } from 'tabler-icons-react';

function MarketDataGroup({ data, lastDayData, onChartSelect }) {
  return (
    data && (
      <>
        <Heading className="text-white flex gap-x-4 items-center">
          <ChartDots3 />
          Titano Market Dashboard
        </Heading>
        <p className="mb-4 text-slate-200 text-xs">
          Last updated:{' '}
          <>{format(new Date(data.created_at), 'yyyy-MM-dd HH:mm')}</>
        </p>
        <div className="flex flex-wrap">
          <StatsTabsGroup
            data={data}
            lastDayData={lastDayData}
            onChartSelect={onChartSelect}
          />
        </div>
      </>
    )
  );
}

export default MarketDataGroup;
