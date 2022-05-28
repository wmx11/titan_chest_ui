import React, { useEffect, useState } from 'react';
import { TypographyStylesProvider } from '@mantine/core';

function CmsBlock({ dataSet, block, provideStyles }) {
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

  const CmsContent = () =>
    data && (
      <div
        className="text-white break-words"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
    );

  return (
    data &&
    (provideStyles ? (
      <TypographyStylesProvider>
        <CmsContent />
      </TypographyStylesProvider>
    ) : (
      <CmsContent />
    ))
  );
}

export default CmsBlock;
