import { addMonths, addYears, intervalToDuration } from 'date-fns';
import { toDays } from 'duration-fns';

const convertToDays = (periodType, period) => {
  if (!periodType || !period) {
    return null;
  }
  let newDate = null;

  if (periodType === 'months') {
    newDate = addMonths(new Date(), period);
  }

  if (periodType === 'years') {
    newDate = addYears(new Date(), period);
  }

  const interval = intervalToDuration({
    start: new Date(),
    end: newDate,
  });

  const days = toDays(interval);

  return Math.floor(days) || null;
};

export default convertToDays;
