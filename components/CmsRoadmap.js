import React from 'react';
import { Timeline } from '@mantine/core';
import { Check, Clock } from 'tabler-icons-react';
import useCmsData from '../hooks/cms/useCmsData';
import NeonText from './NeonText';
import SmallText from './SmallText';

function CmsRoadmap({ dataSet, block }) {
  const { data } = useCmsData(dataSet, block);

  if (!data) {
    return;
  }

  const cmsData = data.data.data
    .filter((item) => item.enabled && item)
    .sort((a, b) => a.position > b.position);

  const completedItems = cmsData.filter((item) => item.completed).length;

  return (
    <Timeline
      active={completedItems}
      bulletSize={24}
      lineWidth={2}
      color="grape"
    >
      {cmsData &&
        cmsData.map(({ title, description, completed }, index) => (
          <Timeline.Item
            key={`${title}_${index}`}
            lineVariant={completed ? 'solid' : 'dashed'}
            bullet={completed ? <Check size={18} /> : <Clock size={18}/>}
          >
            <NeonText>{title}</NeonText>
            <SmallText html={description} />
          </Timeline.Item>
        ))}
    </Timeline>
  );
}

export default CmsRoadmap;
