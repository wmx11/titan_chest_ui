import handlePeriod from './handlePeriod';

const getMaxPeriodRange = (periodType, value) => {
  if (!periodType || !value) {
    return;
  }
  const maxRange = handlePeriod(periodType, {
    days: () => (value < 1466 ? value : 1466),
    weeks: () => (value < 209 ? value : 209),
    months: () => (value < 48 ? value : 48),
    years: () => (value < 4 ? value : 4),
  });

  return maxRange;
};

export default getMaxPeriodRange;
