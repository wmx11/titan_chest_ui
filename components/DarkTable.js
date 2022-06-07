import { ScrollArea } from '@mantine/core';
import React from 'react';
import DarkBox from './DarkBox';

function DarkTable({ data }) {
  const headData = data[0]?.head;
  const rowsData = data[1]?.rows;

  const Head = ({ head }) => {
    if (!head) {
      return;
    }

    return (
      <div className="hidden mb-4 gap-x-4 lg:flex bg-slate-900/50 p-3 border border-slate-800/80 rounded-md text-white">
        {head.map(({ width, name }, index) => (
          <div
            style={{ maxWidth: width, width: '100%' }}
            key={`dark_table_head_${index}_${name}`}
            className={`lg:text-sm font-bold`}
          >
            {name}
          </div>
        ))}
      </div>
    );
  };

  const Row = ({ rows }) => {
    if (!rows) {
      return;
    }

    return (
      <ScrollArea style={{ width: 'auto', height: '500px' }} offsetScrollbars>
        {rows.map(({ row }, rowsIndex) => {
          return (
            <div
              key={`dark_table_rows_${rowsIndex}`}
              className={`mb-2 flex-col gap-x-4 lg:flex-row flex bg-slate-900/50 border border-slate-800/80 p-3 rounded-md hover:border-titano-green hover:shadow-md hover:shadow-titano-green/30 hover:bg-titano-green/5 transition`}
            >
              {row.map(({ value, truncate }, index) => (
                <div
                  style={{ maxWidth: headData[index]?.width, width: '100%' }}
                  key={`dark_table_row_${index}_${value}`}
                  className={`text-white mb-2 lg:mb-0 break-all lg:text-sm ${
                    truncate ? 'truncate' : ''
                  }`}
                >
                  {value}
                  <div className="block lg:hidden mb-4">
                    <strong>{headData[index]?.name}</strong>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </ScrollArea>
    );
  };
  return (
    <>
      <DarkBox>
        <Head head={headData} />
        <Row rows={rowsData} />
      </DarkBox>
    </>
  );
}

export default DarkTable;
