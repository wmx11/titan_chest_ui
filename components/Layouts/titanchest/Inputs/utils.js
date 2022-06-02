export const parseDollar = (value) => value.replace(/\$\s?|(,*)/g, '');

export const formatCurrency = (value, currency, separator = ',') =>
  !Number.isNaN(parseFloat(value))
    ? `${currency === 'usd' ? '$ ' : ''}${value}`.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        separator
      )
    : `${currency === 'usd' ? '$ ' : ''}`;
