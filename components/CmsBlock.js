import React from 'react';
import { TypographyStylesProvider } from '@mantine/core';
import useCmsData from '../hooks/cms/useCmsData';

function CmsBlock({ dataSet, block, provideStyles }) {
  const { data } = useCmsData(dataSet, block);
  
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
