const toLocaleString = (number) => {
  if (!number) {
    return 0;
  }

  return number.toLocaleString().length < 25
    ? number.toLocaleString()
    : Math.floor(number);
};

export default toLocaleString;
