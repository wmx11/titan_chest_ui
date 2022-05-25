import { format } from 'date-fns';
import React from 'react';
import Heading from '../Heading';
import StatsTabsGroup from './StatsTabsGroup';

function MarketDataGroup({ data, lastDayData, onChartSelect }) {
  return (
    data && (
      <>
        <Heading className="text-white">Titano Market Data</Heading>
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
