const toCurrency = (number) => {
  if (!number) {
    return;
  }

  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumSignificantDigits: 2,
    maximumSignificantDigits: number.toFixed(3).length - 1,
  });
};

export default toCurrency;
