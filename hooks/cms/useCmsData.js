import { useEffect, useState } from 'react';

const useCmsData = (dataSet, block) => {
  const [state, setState] = useState();

  useEffect(() => {
    if (Array.isArray(dataSet)) {
      const dataByBlock = dataSet.find(
        ({ attributes: { block_name } }) => block_name === block
      );

      if (dataByBlock && dataByBlock.hasOwnProperty('attributes')) {
        setState({ ...dataByBlock.attributes });
      }
    }
  }, [dataSet, block]);

  const data = state;

  return { data, block };
};

export default useCmsData;
