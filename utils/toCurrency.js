const toCurrency = (number) => {
  if (!number) {
    return;
  }

  const range = number.toFixed(3).length - 1;

  const result = number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumSignificantDigits: 2,
    maximumSignificantDigits: range < 10 ? range : 9,
  });

  return result.length < 25 ? result : Math.floor(number);
};

export default toCurrency;
