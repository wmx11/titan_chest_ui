const handlePeriod = (periodType, { days, weeks, months, years }) => {
  switch (periodType) {
    case 'days':
      return days ? days() : null;
    case 'weeks':
      return weeks ? weeks() : null;
    case 'months':
      return months ? months() : null;
    case 'years':
      return years ? years() : null;
    default:
      break;
  }
};

export default handlePeriod;
