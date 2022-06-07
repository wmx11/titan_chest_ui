import React from 'react';
import toCurrency from '../utils/toCurrency';
import toLocaleString from '../utils/toLocaleString';
import DarkBox from './DarkBox';

function EarningsTable({ data, price }) {
  if (!data) {
    return;
  }

  const rowStyles =
    'mb-2 flex-col gap-y-2 md:gap-y-0 md:flex-row flex bg-slate-900/50 p-3 rounded-md hover:border-titano-green border border-slate-800/80 hover:shadow-md hover:shadow-titano-green/30 hover:bg-titano-green/5 transition';

  const {
    initial,
    compounded,
    interest,
    tax,
    taxed,
    profit,
    dueDate,
    numberOfRebases,
    hasFuturePrice,
    priceInFuture,
  } = data;

  const getUSD = (amount, usdPrice = hasFuturePrice ? priceInFuture : price) =>
    toCurrency(amount * usdPrice) || 0;

  return (
    data && (
      <DarkBox>
        <div className="mb-4 hidden md:flex bg-slate-900/50 p-3 rounded-md border border-slate-800/80">
          <div className="w-[100%] max-w-[150px] mr-1"></div>
          <div className="w-[100%] max-w-[200px] mr-1">Titano</div>
          <div className="w-[100%] max-w-[200px] mr-1">USD</div>
        </div>

        <div className={rowStyles}>
          <div className="w-[100%] max-w-[150px] mr-1">Initial balance</div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all">
            {toLocaleString(initial)}
          </div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all">
            {getUSD(initial, price)}
          </div>
        </div>

        <div className={rowStyles}>
          <div className="w-[100%] max-w-[150px] mr-1">Interest</div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all">
            {toLocaleString(interest)}
          </div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all">
            {getUSD(interest)}
          </div>
        </div>

        <div className={rowStyles}>
          <div className="w-[100%] max-w-[150px] mr-1">Before sell tax</div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all">
            {toLocaleString(compounded)}
          </div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all">
            {getUSD(compounded)}
          </div>
        </div>

        <div className={rowStyles}>
          <div className="w-[100%] max-w-[150px] mr-1">Sell tax (18%)</div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all text-titano-pink">
            -{toLocaleString(tax)}
          </div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all text-titano-pink">
            -{getUSD(tax)}
          </div>
        </div>

        <div className={rowStyles}>
          <div className="w-[100%] max-w-[150px] mr-1">Total</div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)]">
            {toLocaleString(taxed)}
          </div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)]">
            {getUSD(taxed)}
          </div>
        </div>

        <div className={rowStyles}>
          <div className="w-[100%] max-w-[150px] mr-1">Profit</div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)]">
            {toLocaleString(profit)}
          </div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)]">
            {getUSD(profit)}
          </div>
        </div>

        <div className={rowStyles}>
          <div className="w-[100%] max-w-[150px] mr-1">Final date</div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)]">
            {dueDate}
          </div>
        </div>

        <div className={rowStyles}>
          <div className="w-[100%] max-w-[150px] mr-1">Number of rebases</div>
          <div className="w-[100%] max-w-[200px] mr-1 break-all text-titano-green drop-shadow-[0px_0px_3px_rgb(0,253,213)]">
            {toLocaleString(numberOfRebases)}
          </div>
        </div>
      </DarkBox>
    )
  );
}

export default EarningsTable;
