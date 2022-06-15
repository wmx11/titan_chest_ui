import { AccordionItem } from '@mantine/core';
import React from 'react';
import Accordion from '../Accordion';
import Switch from '../Inputs/Switch';

function UseCaseFilter({ toggles, handleToggle }) {
  return (
    <Accordion>
      <AccordionItem label="Select Filters">
        <div className="flex flex-col gap-y-4 text-white">
          <Switch
            checked={toggles.totalSupply}
            onChange={() => handleToggle('totalSupply')}
            label="Total Supply"
          />
          <Switch
            checked={toggles.circulatingSupply}
            onChange={() => handleToggle('circulatingSupply')}
            label="Circulating Supply"
          />
          <Switch
            checked={toggles.burnedTokens}
            onChange={() => handleToggle('burnedTokens')}
            label="Burned Tokens"
          />
          <Switch
            checked={toggles.tokenPrice}
            onChange={() => handleToggle('tokenPrice')}
            label="Token Price"
          />
          <Switch
            checked={toggles.inflation}
            onChange={() => handleToggle('inflation')}
            label="Inflation : Burn Ratio"
          />
          <Switch
            checked={toggles.holders}
            onChange={() => handleToggle('holders')}
            label="Holders"
          />
          <Switch
            checked={toggles.avgHoldings}
            onChange={() => handleToggle('avgHoldings')}
            label="Average Holdings"
          />
          <Switch
            checked={toggles.bnbPrice}
            onChange={() => handleToggle('bnbPrice')}
            label="BNB Price"
          />
          <Switch
            checked={toggles.thisWeek}
            onChange={() => handleToggle('thisWeek')}
            label="This Week"
          />
          <Switch
            checked={toggles.lastWeek}
            onChange={() => handleToggle('lastWeek')}
            label="Last Week"
          />
          <Switch
            checked={toggles.thisMonth}
            onChange={() => handleToggle('thisMonth')}
            label="This Month"
          />
        </div>
      </AccordionItem>
    </Accordion>
  );
}

export default UseCaseFilter;
