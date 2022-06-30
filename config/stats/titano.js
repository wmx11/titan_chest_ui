import { getBackedLiquidity } from '../../utils/getters';

export const statsTemplate = [
  {
    entry: 'price',
    name: 'Price',
    tooltip: 'Current Titano Token price in $USD.',
  },
  {
    entry: 'marketcap',
    name: 'Market Cap',
    tooltip: 'Titano Current Market Cap. Total Supply * Price.',
  },
  {
    entry: 'treasury',
    name: 'Treasury',
    tooltip:
      'Titano Treasury Valuation in $USD. Titano Assets held in BNB Tokens.',
  },
  {
    entry: 'rfv',
    name: 'RFV',
    tooltip:
      'Titano Risk Free Value (RVF) wallet valuation in $USD. RFV assets held in BNB Tokens. The RFV purpose is to support Titano Liquidity when appropriate.',
  },
  {
    entry: 'liquidity',
    name: 'Liquidity (WBNB)',
    tooltip:
      'Current Titano Liquidity valuation in $USD. Titano Liquidity pair = WBNB token.',
  },
  {
    entry: 'holders',
    name: 'Holders (1+ tokens)',
    currency: false,
    tooltip:
      'Current number of wallets holding 1+ Titano Tokens. Fluctuates regularly and differs to BSC Scan.',
  },
  {
    entry: 'average_holdings',
    name: 'Average Holding (Titano tokens)',
    currency: false,
    tooltip:
      'Calculates (adds up all holder wallets tokens and divides by the number of holder wallets) the average wallet token holding.',
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
      'Healthiness of the protocol. RFV+Treasury as a percentage of Liquidity. Higher = better.',
  },
  {
    entry: 'pair_price',
    name: 'BNB Price',
    tooltip: 'Current BNB Token valuation in $USD Titano main liquidity pair.',
  },
  {
    entry: 'total_supply',
    compute: 'marketcap,price,total_supply',
    name: 'Total Supply',
    currency: false,
    tooltip: 'Titano Token total supply.',
  },
  {
    entry: 'burned_tokens',
    name: 'Tokens Burned',
    currency: false,
    tooltip:
      'Total number of Tokens removed from circulation and stored in the burn wallet. Note: burn wallet tokens receive rebases.',
  },
  {
    entry: 'circulating_supply',
    compute: 'marketcap,price,burned_tokens,circulating_supply',
    name: 'Circulating Supply',
    currency: false,
    tooltip:
      'Total supply of tokens less tokens burned. Value decreasing or a 24hour increase rate of less than 1.92% indicates deflation.',
  },
  {
    entry: false,
    name: 'Crypto Market Sentiment',
    value: (data) => {
      return `${data.fear_index || 'Scanning...'} ${
        data.fear_value ? `(${data.fear_value}/100)` : ''
      }`;
    },
    tooltip:
      'Demonstrates how the market is overall. Extreme fear signals investors are anxious and often a good buying opportunity. Extreme greed signals investors are overly bullish and a market correction is imminent.',
  },
];
