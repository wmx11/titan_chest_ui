import React from 'react';
import { statsTemplate } from '../../config/stats/titano';
import toCurrency from '../../utils/toCurrency';
import StatsTab from './StatsTab';

function StatsTabsGroup({ data, lastDayData, onChartSelect }) {
  return (
    data &&
    statsTemplate.map(({ entry, name, currency, value, tooltip }, index) => {
      if (data[entry] && entry !== false) {
        return (
          <StatsTab
            key={`${entry}_${name}_${index}`}
            type={entry}
            name={name}
            dayChange={(data[entry] / lastDayData[entry] - 1) * 100}
            value={
              currency !== false
                ? toCurrency(data[entry], data[entry].toFixed(3).length - 1)
                : data[entry].toLocaleString()
            }
            tooltip={tooltip}
            onChartSelect={onChartSelect}
          />
        );
      }

      if (entry === false && value) {
        return (
          <StatsTab
            key={`${entry}_${name}_${index}`}
            name={name}
            value={value(data)}
            tooltip={tooltip}
          />
        );
      }
    })
  );
}

export default StatsTabsGroup;
