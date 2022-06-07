import { ScrollArea } from '@mantine/core';
import { addDays, format, setMinutes } from 'date-fns';
import React from 'react';
import { FileSpreadsheet } from 'tabler-icons-react';
import titanoConfig from '../config/titano';
import downloadExcel from '../utils/downloadExcel';
import getCompoundingEffect from '../utils/getCompoundingEffect';
import toCurrency from '../utils/toCurrency';
import toLocaleString from '../utils/toLocaleString';
import DarkBox from './DarkBox';

function RebaseEarningsTable({ data, price }) {
  if (!data) {
    return;
  }

  const {
    initial,
    days,
    hasFuturePrice,
    priceInFuture,
    priceInFutureAfterDays,
  } = data;

  const getUSD = (amount, usdPrice = price) =>
    toCurrency(amount * usdPrice) || 0;

  const generateRebases = (iterations) => {
    const rebaseArray = [];
    let iteration = 1;
    let date = setMinutes(new Date(), 0);

    const iterate = () => {
      if (iteration <= iterations) {
        const compounded = getCompoundingEffect(
          initial,
          iteration,
          titanoConfig.dailyInterest
        );

        const interest = compounded - initial;

        const perDay =
          iteration === 1
            ? interest
            : compounded -
              getCompoundingEffect(
                initial,
                iteration - 1,
                titanoConfig.dailyInterest
              );

        const interestUsd =
          priceInFutureAfterDays < iteration && hasFuturePrice
            ? getUSD(interest, priceInFuture)
            : getUSD(interest);

        const usdPerDay =
          priceInFutureAfterDays < iteration && hasFuturePrice
            ? getUSD(perDay, priceInFuture)
            : getUSD(perDay);

        date = addDays(date, 1);

        rebaseArray.push({
          day: iteration,
          balance: compounded,
          interest_tokens: interest,
          interest_usd: interestUsd,
          tokens_per_day: perDay,
          usd_per_day: usdPerDay,
          price_usd: price,
          future_price_usd: priceInFuture,
          future_price_takes_affect_in: priceInFutureAfterDays,
          price_usd_changeover:
            priceInFutureAfterDays < iteration && hasFuturePrice,
          date: format(date, 'yyyy-MM-dd HH:mm, EEEE'),
        });
        iteration++;
        iterate(iteration);
      } else {
        return rebaseArray;
      }
    };

    iterate();

    return rebaseArray;
  };

  const rebases = generateRebases(days);

  return (
    rebases && (
      <DarkBox>
        <div className="flex justify-between itemse-center">
          <p className="mb-4 p-3">
            Rebase breakdown for the number of {days} days{' '}
          </p>
          <p
            onClick={() => downloadExcel(rebases)}
            className="mb-4 flex items-center p-3 cursor-pointer rounded-md hover:border-titano-green border border-transparent hover:shadow-md hover:shadow-titano-green/30 hover:bg-titano-green/5 transition"
          >
            Export <FileSpreadsheet size={30} className="ml-2" />
          </p>
        </div>
        <div className="hidden mb-4 lg:flex bg-slate-900/50 p-3 rounded-md border border-slate-800/80">
          <div className="w-[100%] mr-1 max-w-[80px]">Day</div>
          <div className="w-[100%] mr-1 max-w-[120px]">Balance</div>
          <div className="w-[100%] mr-1 max-w-[120px]">Interest</div>
          <div className="w-[100%] mr-1 max-w-[120px]">USD (Interest)</div>
          <div className="w-[100%] mr-1 max-w-[140px]">Per Day (Titano)</div>
          <div className="w-[100%] mr-1 max-w-[120px]">USD (Per Day)</div>
          <div className="w-[100%] mr-1 max-w-[250px]">Date</div>
        </div>
        <ScrollArea style={{ width: '100%', height: '500px' }} offsetScrollbars>
          {rebases.map(
            (
              {
                day,
                balance,
                interest_tokens,
                interest_usd,
                tokens_per_day,
                usd_per_day,
                date,
                price_usd_changeover,
                future_price_usd,
              },
              index
            ) => (
              <div
                className={`${
                  price_usd_changeover ? 'bg-titano-pink/5' : ''
                } mb-2 flex-col lg:flex-row flex bg-slate-900/50 p-3 rounded-md hover:border-titano-green border border-slate-800/80 hover:shadow-md hover:shadow-titano-green/30 hover:bg-titano-green/5 transition`}
                key={`rebase_${index}`}
              >
                <div className="mb-2 lg:mb-0 w-[100%] mr-1 lg:max-w-[80px]">
                  <div className="lg:hidden font-bold border-b w-full">Day</div>
                  {toLocaleString(day)}
                </div>
                <div className="mb-2 lg:mb-0 w-[100%] mr-1 lg:max-w-[120px]">
                  <div className="lg:hidden font-bold border-b w-full">
                    Balance
                  </div>
                  {toLocaleString(balance)}
                </div>
                <div className="mb-2 lg:mb-0 w-[100%] mr-1 lg:max-w-[120px]">
                  <div className="lg:hidden font-bold border-b w-full">
                    Interest
                  </div>
                  {toLocaleString(interest_tokens)}
                </div>
                <div className="mb-2 lg:mb-0 w-[100%] mr-1 lg:max-w-[120px]">
                  <div className="lg:hidden font-bold border-b w-full">
                    USD (Interest)
                  </div>
                  {interest_usd}
                  {price_usd_changeover
                    ? ` (@${toCurrency(future_price_usd)})`
                    : ''}
                </div>
                <div className="mb-2 lg:mb-0 w-[100%] mr-1 lg:max-w-[140px]">
                  <div className="lg:hidden font-bold border-b w-full">
                    Per Day (Titano)
                  </div>
                  {toLocaleString(tokens_per_day)}
                </div>
                <div className="mb-2 lg:mb-0 w-[100%] mr-1 lg:max-w-[120px]">
                  <div className="lg:hidden font-bold border-b w-full">
                    USD (Per Day)
                  </div>
                  {usd_per_day}
                  {price_usd_changeover
                    ? ` (@${toCurrency(future_price_usd)})`
                    : ''}
                </div>
                <div className="mb-2 lg:mb-0 w-[100%] mr-1 lg:max-w-[250px]">
                  <div className="lg:hidden font-bold border-b w-full">
                    Date
                  </div>
                  {date}
                </div>
              </div>
            )
          )}
        </ScrollArea>
      </DarkBox>
    )
  );
}

export default RebaseEarningsTable;
