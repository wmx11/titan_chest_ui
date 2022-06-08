import { Indicator, TypographyStylesProvider } from '@mantine/core';
import { format, isToday } from 'date-fns';
import React from 'react';
import { ArrowForward } from 'tabler-icons-react';
import DarkBox from '../../DarkBox';
import NeonText from '../../NeonText';

function Post({ data, isSummary }) {
  if (!data) {
    return;
  }

  const { content, summary, publishedAt, title, slug } = data;

  const datePublished = format(new Date(publishedAt), 'yyy-MM-dd HH:mm');
  const isPublishedToday = isToday(new Date(datePublished));

  const Title = () => {
    if (!isSummary) {
      return;
    }

    if (isPublishedToday) {
      return (
        <Indicator
          inline
          label="New!"
          size={16}
          classNames={{
            indicator: 'bg-titano-pink shadow-lg shadow-titano-pink/30',
          }}
        >
          <NeonText>{title}</NeonText>
        </Indicator>
      );
    }

    return <NeonText>{title}</NeonText>;
  };

  return (
    <DarkBox className="mb-4">
      <Title />
      <p className="text-white text-xs mt-2 mb-4">{datePublished}</p>
      <TypographyStylesProvider>
        {isSummary ? (
          <p className="text-white text-sm" style={{ wordBreak: 'break-word' }}>
            {summary}
          </p>
        ) : (
          <p
            className="text-white text-md"
            style={{ wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        )}
      </TypographyStylesProvider>
      {isSummary && (
        <div className="flex justify-end text-white w-full">
          <p className="text-sm flex items-center gap-x-2">
            Continue reading <ArrowForward size={15} />
          </p>
        </div>
      )}
    </DarkBox>
  );
}

export default Post;
