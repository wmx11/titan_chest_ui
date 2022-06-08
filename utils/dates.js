import { format, previousMonday, startOfMonth, startOfWeek } from 'date-fns';

export const formatDate = (date) => format(date, 'yyyy-MM-dd');

export const startOfThisMonthDate = formatDate(startOfMonth(new Date()));

export const startOfThisWeekDate = formatDate(
  startOfWeek(new Date(), { weekStartsOn: 1 })
);

export const startOfLastWeekDate = formatDate(
  previousMonday(new Date(startOfThisWeekDate))
);

export const today = formatDate(new Date());
