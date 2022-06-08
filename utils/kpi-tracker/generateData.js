import { intervalToDuration } from 'date-fns';
import { toDays } from 'duration-fns';
import toCurrency from '../toCurrency';
import toPercentage from '../toPercentage';
import titanoConfig from '../../config/titano';

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
    const dates = date.split(' - ');

    const days = toDays(
      intervalToDuration({
        start: new Date(dates[0]),
        end: new Date(dates[1]),
      })
    );

    const dailyInterest = titanoConfig.dailyInterest;

    const inflation = Math.trunc(dailyInterest * days * 100);

    return [
      {
        name: 'Total Supply',
        show: state.totalSupply,
        value: Math.trunc(item.total_supply || 0).toLocaleString(),
        change:
          countChange &&
          toPercentage(item.total_supply, fromData.total_supply) - 100,
      },
      {
        name: 'Circulating Supply',
        show: state.circulatingSupply,
        value: Math.trunc(
          item.circulating_supply || item.total_supply
        ).toLocaleString(),
        change:
          countChange &&
          toPercentage(
            item.circulating_supply || item.total_supply,
            fromData.circulating_supply || fromData.total_supply
          ) - 100,
      },
      {
        name: 'Burned Tokens',
        show: state.burnedTokens,
        value: Math.trunc(item.burned_tokens || 0).toLocaleString(),
        change:
          countChange &&
          toPercentage(item.burned_tokens || 0, fromData.burned_tokens || 0) -
            100,
      },
      {
        name: 'Token Price',
        show: state.tokenPrice,
        value: toCurrency(item.price),
        change: countChange && toPercentage(item.price, fromData.price) - 100,
      },
      {
        name: 'Inflation : Burn Ratio',
        show: state.inflation,
        value: `${inflation}% : ${Math.round(
          toPercentage(item.burned_tokens || 0, fromData.burned_tokens || 0) -
            100 ===
            Infinity
            ? 0
            : toPercentage(
                item.burned_tokens || 0,
                fromData.burned_tokens || 0
              ) - 100 || 0
        ).toFixed(0)}%`,
        change: false,
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

  return {
    period,
    date,
    milestones,
    show: state[type],
    dataSet: {
      from: createDataset(fromData, false),
      to: createDataset(toData, true),
    },
  };
};
