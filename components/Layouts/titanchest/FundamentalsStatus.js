import React, { useEffect, useState } from 'react';
import toCurrency from '../../../utils/toCurrency';
import DarkBox from '../../DarkBox';

function FundamentalsStatus({ dataSet }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (Array.isArray(dataSet)) {
      setData(dataSet[0]);
    } else {
      setData(dataSet);
    }
  }, [dataSet]);

  const levels = {
    treasury: { danger: 400000, medium: 800000, good: 1000000 },
    rfv: { danger: 400000, medium: 800000, good: 1000000 },
    liquidity: { danger: 200000, medium: 800000, good: 1000000 },
  };

  const getLevel = (asset, type) => {
    if (asset > levels[type].good) {
      return 'bg-titano-green shadow-[0px_0px_9px_rgb(0,253,213)]';
    }

    if (
      (asset >= levels[type].danger || asset >= levels[type].medium) &&
      asset <= levels[type].good
    ) {
      return 'bg-[#df3902] shadow-[0px_0px_9px_rgb(223,57,2)]';
    }

    if (asset <= levels[type].danger) {
      return 'bg-titano-pink shadow-[0px_0px_9px_rgb(220,2,223)]';
    }
  };

  return (
    data && (
      <DarkBox className="mb-4 w-full md:w-[250px]">
        <p className="text-white text-sm mb-2">Titano fundamentals status</p>
        {data &&
          ['Treasury', 'RFV', 'Liquidity'].map((item, index) => (
            <div
              className="flex items-center mb-2"
              key={`fundamental_stats_${index}`}
            >
              <div
                className={` ${getLevel(
                  data[item.toLocaleLowerCase()],
                  item.toLocaleLowerCase()
                )} rounded-full w-2 h-2 mr-4`}
              ></div>
              <p className="text-white text-xs">
                {item}
                <p>{toCurrency(data[item.toLocaleLowerCase()] || 0)}</p>
              </p>
            </div>
          ))}
      </DarkBox>
    )
  );
}

export default FundamentalsStatus;
