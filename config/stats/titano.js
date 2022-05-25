import { getBackedLiquidity } from '../../utils/getters';

export const statsTemplate = [
  {
    entry: 'price',
    name: 'Price',
    tooltip: 'Displays the current Titano price in $USD',
  },
  {
    entry: 'marketcap',
    name: 'Market Cap',
    tooltip: 'Displays the current Titano market cap. (Total supply * Price)',
  },
  {
    entry: 'treasury',
    name: 'Treasury',
    tooltip:
      'Displays the current Titano treasury $USD value. Treasury assets are kept in BNB tokens.',
  },
  {
    entry: 'rfv',
    name: 'RFV',
    tooltip:
      'Displays the current Titano RFV $USD value. RFV assets are kept in BNB tokens. RFV is used to support Titano liquidity when it gets extremely low.',
  },
  {
    entry: 'liquidity',
    name: 'Liquidity (WBNB)',
    tooltip:
      'Displays the current Titano liquidity $USD value. Titano liquidity pair is the WBNB token.',
  },
  {
    entry: 'holders',
    name: 'Holders (>= 1)',
    currency: false,
    tooltip:
      'Displays the current number of wallets holding at least 1 Titano token. Values may fluctuate. Values will differ from that of BSC Scan.',
  },
  {
    entry: 'average_holdings',
    name: 'Average Holding (Titano tokens)',
    currency: false,
    tooltip:
      'Displays the average amount of Titano tokens a typical wallet is holding.',
  },
  {
    entry: false,
    name: 'Backed Liquidity',
    value: (data) =>
      getBackedLiquidity({
        rfv: data.rfv,
        treasury: data.treasury,
        liquidity: data.liquidity,
      }),
    tooltip:
      'Healthiness of the protocol. Displays the percentage of liquidity that both the RFV and Treasury combined could provide.',
  },
  {
    entry: 'pair_price',
    name: 'BNB Price',
    tooltip:
      'Displays the $USD value of BNB token. (Titano main liquidity pair)',
  },
  {
    entry: false,
    name: 'Total Supply',
    value: (data) => {
      return (data.marketcap / data.price).toLocaleString();
    },
    tooltip: 'Displays the Titano token total supply.',
  },
];
