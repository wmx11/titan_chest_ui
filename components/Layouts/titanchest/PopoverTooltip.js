import { InformationCircleIcon } from '@heroicons/react/solid';
import { Popover } from '@mantine/core';
import React, { useState } from 'react';

function PopoverTooltip({ tooltip }) {
  const [opened, setOpened] = useState(false);

  return (
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
  );
}

export default PopoverTooltip;
