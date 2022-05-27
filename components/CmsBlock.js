import React, { useEffect, useState } from 'react';

function CmsBlock({ dataSet, block }) {
  const [data, setData] = useState('');

  useEffect(() => {
    if (Array.isArray(dataSet)) {
      const dataByBlock = dataSet.find(
        ({ attributes: { block_name } }) => block_name === block
      );

      if (dataByBlock && dataByBlock.hasOwnProperty('attributes')) {
        setData({ ...dataByBlock.attributes });
      }
    }
  }, [dataSet, block]);

  return (
    data && (
      <div
        className="text-white break-words"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
    )
  );
}

export default CmsBlock;
