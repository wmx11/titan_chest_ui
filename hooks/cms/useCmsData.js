import { useEffect, useState } from 'react';

const useCmsData = (dataSet, block, isCollection) => {
  const [state, setState] = useState();
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    if (isCollection) {
      if (Array.isArray(dataSet)) {
        const data = dataSet.map((item) => item.attributes);
        setCollection(data);
      }
      return;
    }

    if (Array.isArray(dataSet)) {
      const dataByBlock = dataSet.find(
        ({ attributes: { block_name } }) => block_name === block
      );

      if (dataByBlock && dataByBlock.hasOwnProperty('attributes')) {
        setState({ ...dataByBlock.attributes });
      }
    }
  }, [dataSet, block, isCollection]);

  const data = isCollection ? collection : state;

  return { data, block };
};

export default useCmsData;
