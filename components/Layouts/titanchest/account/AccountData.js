import React, { useEffect, useState } from 'react';
import titanoConfig from '../../../../config/titano';
import useHolderData from '../../../../hooks/useHolderData';
import usePriceImpact from '../../../../hooks/usePriceImpact';
import getCompoundingEffect from '../../../../utils/getCompoundingEffect';
import toCurrency from '../../../../utils/toCurrency';
import { TitanoGreenButton, TitanoPinkButton } from '../../../Buttons';
import DarkBox from '../../../DarkBox';
import GoBack from '../../../GoBack';
import NeonText from '../../../NeonText';

function AccountData({ titano, address }) {
  const { holder } = useHolderData(address);
  const [dailyInterest, setDailyInterest] = useState();
  const [weeklyInterest, setWeeklyInterest] = useState();
  const [monthlyInterest, setMonthlyInterest] = useState();
  const [quarterlyInterest, setQuarterlyInterest] = useState();
  const [nextRebase, setNextRebase] = useState();
  const { impactResults, setAmount } = usePriceImpact({
    transactionType: 'sell',
    transactionCurrency: 'titano',
    transactionAmount: holder.balance,
  });

  useEffect(() => {
    if (holder) {
      const interest = getCompoundingEffect(
        holder.balance,
        1,
        titanoConfig.dailyInterest
      );

      const interestPerWeek = getCompoundingEffect(
        holder.balance,
        7,
        titanoConfig.dailyInterest
      );

      const interestPerMonth = getCompoundingEffect(
        holder.balance,
        30,
        titanoConfig.dailyInterest
      );

      const interestPerQuarter = getCompoundingEffect(
        holder.balance,
        90,
        titanoConfig.dailyInterest
      );

      const nextRebaseInterest = getCompoundingEffect(holder.balance, 1);

      setDailyInterest(interest - holder.balance);
      setWeeklyInterest(interestPerWeek - holder.balance);
      setMonthlyInterest(interestPerMonth - holder.balance);
      setQuarterlyInterest(interestPerQuarter - holder.balance);
      setNextRebase(nextRebaseInterest - holder.balance);
      setAmount(holder.balance);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holder]);

  return (
    <div>
      <GoBack />
      {titano && (
        <div className="mb-8">
          <DarkBox className="mb-4 text-white flex-1">
            <div className="flex gap-4 flex-wrap">
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {toCurrency(titano.price)}
                </NeonText>
                <NeonText className="!text-xs">Current Price</NeonText>
              </DarkBox>
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {toCurrency(titano.marketcap)}
                </NeonText>
                <NeonText className="!text-xs">Market Cap</NeonText>
              </DarkBox>

              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {toCurrency(titano.liquidity)}
                </NeonText>
                <NeonText className="!text-xs">Liquidity</NeonText>
              </DarkBox>

              {/* <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">14,745</NeonText>
                <NeonText className="text-xs">Total amount of rebases</NeonText>
              </DarkBox>

              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">24:33</NeonText>
                <NeonText className="text-xs">Next Rebase in</NeonText>
              </DarkBox>

              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-xl font-bold mb-2">
                  2022-06-16 16:30
                </NeonText>
                <NeonText className="text-xs">Last rebase</NeonText>
              </DarkBox> */}
            </div>
          </DarkBox>
        </div>
      )}
      <div className="flex justify-between gap-4 flex-wrap mb-8">
        <DarkBox className="mb-4 text-white flex-1">
          <p className="mb-4 text-xl font-bold">Wallet summary</p>
          <div className="flex gap-4 mb-4 flex-wrap">
            <DarkBox withBorder withHover className="text-center flex-1">
              <NeonText className="text-3xl font-bold mb-2">
                {(holder.balance || 0).toLocaleString()}
              </NeonText>
              <NeonText className="!text-xs">Your Balance (Tokens) </NeonText>
            </DarkBox>
            <DarkBox withBorder withHover className="text-center flex-1">
              <NeonText className="text-3xl font-bold mb-2">
                {toCurrency(holder.balance * titano.price || 0)}
              </NeonText>
              <NeonText className="!text-xs">USD Value</NeonText>
            </DarkBox>
          </div>
          <div className="mb-4">
            <DarkBox>
              <p>Wallet rank: {holder.rank}</p>
              <p>Wallet tier: {holder.tier}</p>
              <p style={{ wordBreak: 'break-all' }}>
                Wallet address:{' '}
                <a
                  href={`https://bscscan.com/token/0x4e3cabd3ad77420ff9031d19899594041c420aee?a=${address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-1"
                >
                  {address}
                </a>
              </p>
            </DarkBox>
          </div>

          <div>
            <DarkBox>
              <p className="font-bold text-lg">Price impact</p>
              <p>
                If you sold{' '}
                <strong>{(holder.balance || 0).toLocaleString()}</strong> Titano
              </p>
              <p>
                You would impact the price by{' '}
                <strong>{impactResults?.impact}%</strong>
              </p>
              <p>
                The price after the transaction would be{' '}
                <strong>{toCurrency(impactResults?.price)}</strong>
              </p>
              <p>
                You would receive{' '}
                <strong>
                  {(impactResults?.received || 0).toLocaleString()} BNB
                </strong>{' '}
                or{' '}
                <strong>
                  {toCurrency(
                    impactResults?.received * titano?.pair_price || 0
                  )}{' '}
                </strong>
                before sell tax.
              </p>

              <TitanoGreenButton
                className="text-center font-bold mt-4 block w-52"
                href="calculators/impact"
              >
                Calculate price impact
              </TitanoGreenButton>
            </DarkBox>
          </div>

          <div className="mt-4">
            <TitanoPinkButton
              className="block text-center font-bold"
              href="dashboards/holders"
            >
              View all holders
            </TitanoPinkButton>
          </div>
        </DarkBox>

        <DarkBox className="flex-1 mb-4">
          <DarkBox className="mb-4 text-white flex-1">
            <p className="mb-4 text-xl font-bold">Daily earnings</p>
            <div className="flex gap-4 flex-wrap">
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {(dailyInterest || 0).toLocaleString()}
                </NeonText>
                <NeonText className="!text-xs">Tokens per day</NeonText>
              </DarkBox>
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {toCurrency(dailyInterest * titano.price || 0)}
                </NeonText>
                <NeonText className="!text-xs">USD Value</NeonText>
              </DarkBox>
            </div>
            <div className="mt-4">
              <TitanoGreenButton
                className="block text-center font-bold"
                href={`calculators/earnings?balance=${holder.balance}`}
              >
                Calculate earnings
              </TitanoGreenButton>
            </div>
          </DarkBox>

          <DarkBox className="mb-4 text-white flex-1">
            <p className="mb-4 text-xl font-bold">Next rebase</p>
            <div className="flex gap-4 flex-wrap">
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {(nextRebase || 0).toLocaleString()}
                </NeonText>
                <NeonText className="!text-xs">
                  Tokens earned in the next 30 minutes
                </NeonText>
              </DarkBox>
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {toCurrency(nextRebase * titano.price || 0)}
                </NeonText>
                <NeonText className="!text-xs">USD Value</NeonText>
              </DarkBox>
            </div>
          </DarkBox>
        </DarkBox>
      </div>

      <div className="flex justify-between gap-4 flex-wrap">
        <DarkBox className="mb-4 text-white flex-1">
          <p className="mb-4 text-xl font-bold">Projected ROI</p>
          <div className="mb-8">
            <p className="mb-4 text-md font-bold">Per week (7 days)</p>
            <div className="flex gap-4 mb-4 flex-wrap">
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {(weeklyInterest || 0).toLocaleString()}
                </NeonText>
                <NeonText className="!text-xs">
                  Interest generated (Tokens){' '}
                </NeonText>
              </DarkBox>
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {toCurrency(weeklyInterest * titano.price || 0)}
                </NeonText>
                <NeonText className="!text-xs">USD Value</NeonText>
              </DarkBox>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-4 text-md font-bold">Per month (30 days)</p>
            <div className="flex gap-4 mb-4 flex-wrap">
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {(monthlyInterest || 0).toLocaleString()}
                </NeonText>
                <NeonText className="!text-xs">
                  Interest generated (Tokens){' '}
                </NeonText>
              </DarkBox>
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {toCurrency(monthlyInterest * titano.price || 0)}
                </NeonText>
                <NeonText className="!text-xs">USD Value</NeonText>
              </DarkBox>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-4 text-md font-bold">Per quarter (90 days)</p>
            <div className="flex gap-4 mb-4 flex-wrap">
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {(quarterlyInterest || 0).toLocaleString()}
                </NeonText>
                <NeonText className="!text-xs">
                  Interest generated (Tokens){' '}
                </NeonText>
              </DarkBox>
              <DarkBox withBorder withHover className="text-center flex-1">
                <NeonText className="text-3xl font-bold mb-2">
                  {toCurrency(quarterlyInterest * titano.price || 0)}
                </NeonText>
                <NeonText className="!text-xs">USD Value</NeonText>
              </DarkBox>
            </div>
          </div>
        </DarkBox>
      </div>
    </div>
  );
}

export default AccountData;
