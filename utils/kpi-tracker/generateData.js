import toCurrency from '../toCurrency';
import toPercentage from '../toPercentage';

export const generateData = ({
  period,
  type,
  date,
  fromData,
  toData,
  milestones,
  state,
}) => {
  const createDataset = (item, countChange) => {
    const totalSupplyChange =
      countChange &&
      toPercentage(item.total_supply, fromData.total_supply) - 100;

    const circulatingSupplyChange =
      countChange &&
      toPercentage(
        item.circulating_supply || item.total_supply,
        fromData.circulating_supply || fromData.total_supply
      ) - 100;

    const burnedTokensChange =
      countChange &&
      toPercentage(item.burned_tokens || 0, fromData.burned_tokens || 0) - 100;

    const deflationRatio = totalSupplyChange - circulatingSupplyChange;

    const inflation = Math.trunc(circulatingSupplyChange);

    return [
      {
        name: 'Total Supply',
        show: state.totalSupply,
        value: Math.trunc(item.total_supply || 0).toLocaleString(),
        change: totalSupplyChange,
      },
      {
        name: 'Circulating Supply',
        show: state.circulatingSupply,
        value: Math.trunc(
          item.circulating_supply || item.total_supply
        ).toLocaleString(),
        change: circulatingSupplyChange,
      },
      {
        name: 'Burned Tokens',
        show: state.burnedTokens,
        value: Math.trunc(item.burned_tokens || 0).toLocaleString(),
        change: burnedTokensChange,
      },
      {
        name: 'Token Price',
        show: state.tokenPrice,
        value: toCurrency(item.price),
        change: countChange && toPercentage(item.price, fromData.price) - 100,
      },
      {
        name: 'BNB Price',
        show: state.bnbPrice,
        value: toCurrency(item.pair_price || 0),
        change:
          countChange &&
          toPercentage(item.pair_price, fromData.pair_price) - 100,
      },
      {
        name: 'Inflation : Burn Ratio',
        show: state.inflation,
        value: `${inflation}% : ${Math.round(deflationRatio).toFixed(0)}%`,
        change: false,
        tooltip: `Inflation - The amount by which circulating supply has grown during the given period. 
        Burn Ratio - The amount of tokens that have been removed from circulation in comparison to the figure of inflation during the given period.
        Example - The circulating supply has inflated by ${inflation}%. The inflation has been slowed down by ${Math.round(
          deflationRatio
        ).toFixed(0)}% for this time period.`,
      },
      {
        name: 'Holders',
        show: state.holders,
        value: (item.holders || 0).toLocaleString(),
        change:
          countChange && toPercentage(item.holders, fromData.holders) - 100,
      },
      {
        name: 'Avg. Holdings',
        show: state.avgHoldings,
        value: Math.trunc(item.average_holdings || 0).toLocaleString(),
        change:
          countChange &&
          toPercentage(item.average_holdings, fromData.average_holdings) - 100,
      },
    ];
  };

  const data = {
    period,
    date,
    milestones,
    show: state[type],
    dataSet: {
      from: createDataset(fromData, false),
      to: createDataset(toData, true),
    },
  };

  const getEffect = (number, customUp, customDown) =>
    number > 0 ? customUp || 'grown by' : customDown || 'reduced by';

  const changes = {
    total_supply: toData.total_supply - fromData.total_supply,
    circulating_supply: toData.circulating_supply - fromData.circulating_supply,
    burned_tokens: toData.burned_tokens - fromData.burned_tokens,
    price: toData.price - fromData.price,
    pair_price: toData.pair_price - fromData.pair_price,
  };

  const description = `Over the period of ${period}, Titano Total Supply has ${getEffect(
    changes.total_supply
  )} ${Math.trunc(
    changes.total_supply
  ).toLocaleString()}, Circulating Supply has ${getEffect(
    changes.circulating_supply
  )} ${Math.trunc(
    changes.circulating_supply
  ).toLocaleString()}, the amount of Burned Tokens has ${getEffect(
    changes.burned_tokens
  )} ${Math.trunc(
    changes.burned_tokens
  ).toLocaleString()}, the Price has ${getEffect(
    changes.price,
    'went up by',
    'has fallen by'
  )} ${toCurrency(changes.price)} while the price of BNB has ${getEffect(
    changes.pair_price,
    'went up by',
    'has fallen by'
  )} ${toCurrency(changes.pair_price)}`;

  return { ...data, description };
};
