import {
  format,
  previousMonday,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  sub,
} from 'date-fns';

export const formatDate = (date) => format(date, 'yyyy-MM-dd');

export const getStartOfThisMonthDate = () =>
  formatDate(startOfMonth(new Date()));

export const getStartOfPreviousMonth = () =>
  formatDate(startOfMonth(sub(new Date(), { months: 1 })));

export const getEndOfPreviousMonth = () =>
  formatDate(endOfMonth(sub(new Date(), { months: 1 })));

export const getStartOfThisWeekDate = () =>
  formatDate(startOfWeek(new Date(), { weekStartsOn: 1 }));

export const getStartOfLastWeekDate = () =>
  formatDate(previousMonday(new Date(getStartOfThisWeekDate())));

export const getToday = () => formatDate(new Date());
