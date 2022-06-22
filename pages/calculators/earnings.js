import { Divider } from '@mantine/core';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { addDays, format, weeksToDays } from 'date-fns';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import Heading from '../../components/Heading';
import NumberInput from '../../components/Layouts/titanchest/Inputs/NumberInput';
import SelectInput from '../../components/Layouts/titanchest/Inputs/Select';
import Layout from '../../components/Layouts/titanchest/Layout';
import titanoConfig from '../../config/titano';
import EarningsTable from '../../components/EarningsTable';
import { getStatsList } from '../../utils/getters';
import toCurrency from '../../utils/toCurrency';
import RebaseEarningsTable from '../../components/RebaseEarningsTable';
import getCompoundingEffect from '../../utils/getCompoundingEffect';
import convertToDays from '../../utils/convertToDays';
import handlePeriod from '../../utils/handlePeriod';
import {
  formatCurrency,
  parseDollar,
} from '../../components/Layouts/titanchest/Inputs/utils';
import getMaxPeriodRange from '../../utils/setMaxPeriodRange';
import { TitanoGreenButton, TitanoPinkButton } from '../../components/Buttons';
import { InfoCircle } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import GoBack from '../../components/GoBack';

function Index({ titano }) {
  const [balance, setBalance] = useState(1000);

  const [periodType, setPeriodType] = useState('days');
  const [futurePeriodType, setFuturePeriodType] = useState('days');

  const [period, setPeriod] = useState(30);
  const [futurePeriod, setFuturePeriod] = useState(30);

  const [stats, setStats] = useState();
  const [futurePrice, setFuturePrice] = useState(titano[0]?.price);

  const [results, setResults] = useState();

  const router = useRouter();
  const { query } = router;

  const getPeriod = (periodType, period) => {
    return handlePeriod(periodType, {
      days: () => period,
      weeks: () => weeksToDays(period),
      months: () => convertToDays('months', period),
      years: () => convertToDays('years', period),
    });
  };

  const calculate = (balance, set) => {
    const initial = balance;

    const days = getPeriod(periodType, period);

    const numberOfRebases = days * titanoConfig.rebasesPerDay;

    const compounded = getCompoundingEffect(
      initial,
      days,
      titanoConfig.dailyInterest
    );

    const interest = compounded - initial;
    const taxed = compounded * (1 - titanoConfig.sellTax);
    const tax = compounded - taxed;
    const profit = taxed - initial;

    const priceInFuture = futurePrice;

    const priceInFutureAfterDays = getPeriod(futurePeriodType, futurePeriod);

    const hasFuturePrice =
      futurePrice !== stats.price && priceInFutureAfterDays < days;

    const dueDate = format(addDays(new Date(), days || 1), 'yyyy-MM-dd');

    set({
      initial,
      compounded,
      interest,
      tax,
      taxed,
      profit,
      dueDate,
      days,
      numberOfRebases,
      hasFuturePrice,
      priceInFutureAfterDays,
      priceInFuture,
    });
  };

  const setMaxPeriod = (value, setter, typeOfPeriod) => {
    const maxValue = getMaxPeriodRange(typeOfPeriod, value);
    setter(maxValue);
  };

  useEffect(() => {
    if (titano) {
      setStats(titano[0]);
    }

    if (query.balance) {
      setBalance(parseInt(query.balance, 10) || 0);
    }

    setMaxPeriod(period, setPeriod, periodType);
    setMaxPeriod(futurePeriod, setFuturePeriod, futurePeriodType);
  }, [
    balance,
    period,
    periodType,
    futurePrice,
    futurePeriodType,
    futurePeriod,
    titano,
    query,
  ]);

  return (
    <div>
      <Head>
        <title>Titano Earnings Calculator</title>

        <meta
          name="description"
          content="Titano rebase earnings calculator. Find out how much you could earn by day/week/month/year!"
        />

        <meta
          property="og:description"
          content="Titano rebase earnings calculator. Find out how much you could earn by day/week/month/year!"
        />
      </Head>
      <Layout>
        <Container>
          <GoBack />
          <Heading className="text-white">Earnings Calculator</Heading>
          <p className="text-white mb-4">
            Current Price: {stats ? toCurrency(stats.price) : ''}
          </p>
          <div className="flex flex-col md:flex-row flex-wrap md:gap-x-8">
            <div className="flex-1 min-w-[300px] mb-8">
              <DarkBox>
                <div className="mb-4">
                  <NumberInput
                    value={balance}
                    onChange={setBalance}
                    parser={parseDollar}
                    formatter={(value) => formatCurrency(value, 'titano')}
                    label="My Titano balance is"
                  />
                </div>
                <div className="mb-4 flex flex-wrap gap-x-4 gap-y-4 items-end">
                  <div className="flex-auto">
                    <NumberInput
                      value={futurePrice}
                      onChange={setFuturePrice}
                      precision={6}
                      parser={parseDollar}
                      formatter={(value) => formatCurrency(value, 'usd', '')}
                      label="Future price"
                    />
                  </div>
                  <div className="flex-auto">
                    <NumberInput
                      value={futurePeriod}
                      onChange={(value) =>
                        setMaxPeriod(value, setFuturePeriod, futurePeriodType)
                      }
                      label="after"
                    />
                  </div>
                  <div className="flex-auto">
                    <SelectInput
                      label="a period of"
                      value={futurePeriodType}
                      onChange={setFuturePeriodType}
                      data={[
                        { value: 'days', label: 'Days' },
                        { value: 'weeks', label: 'Weeks' },
                        { value: 'months', label: 'Months' },
                        { value: 'years', label: 'Years' },
                      ]}
                    />
                  </div>
                  <TitanoPinkButton
                    className="flex-auto"
                    onClick={() => {
                      setFuturePrice(stats.price);
                      setFuturePeriod(30);
                      setFuturePeriodType('days');
                      calculate(balance, setResults);
                    }}
                  >
                    Reset future price
                  </TitanoPinkButton>
                </div>
                <DarkBox>
                  <p className="text-white">How much will I earn</p>

                  <Divider className="my-2" />

                  <div className="mb-4 flex gap-x-4">
                    <div className="flex-1">
                      <NumberInput
                        value={period}
                        onChange={(value) =>
                          setMaxPeriod(value, setPeriod, periodType)
                        }
                        label="In"
                      />
                    </div>
                    <div className="flex-1">
                      <SelectInput
                        label="a period of"
                        value={periodType}
                        onChange={setPeriodType}
                        data={[
                          { value: 'days', label: 'Days' },
                          { value: 'weeks', label: 'Weeks' },
                          { value: 'months', label: 'Months' },
                          { value: 'years', label: 'Years' },
                        ]}
                      />
                    </div>
                  </div>

                  <TitanoGreenButton
                    className="w-full font-bold"
                    onClick={() => calculate(balance, setResults)}
                  >
                    Calculate
                  </TitanoGreenButton>
                </DarkBox>
              </DarkBox>
            </div>

            <div className="flex-1 min-w-[300px] md:min-w-[450px]">
              <DarkBox className="text-white">
                <p className="mb-2">
                  How much will I earn in <strong>{period || 0}</strong>{' '}
                  <strong>{periodType}</strong> from today with the initial
                  balance of{' '}
                  <strong>{balance && balance.toLocaleString()}</strong> Titano
                </p>

                <p className="mb-2">
                  Given the price today is {toCurrency(stats?.price)}
                </p>

                {futurePrice && (
                  <p>
                    And the future price after {futurePeriod} {futurePeriodType}{' '}
                    will be {toCurrency(futurePrice)}
                  </p>
                )}

                <Divider className="my-4" />

                {results ? (
                  <EarningsTable data={results} price={stats.price} />
                ) : (
                  <div className="flex items-center justify-center">
                    <InfoCircle size={20} className="mr-2" /> Click the
                    Calculate button to see the results
                  </div>
                )}
              </DarkBox>
            </div>
          </div>
        </Container>

        <Container>
          <DarkBox className="text-white">
            <p className="text-2xl font-bold">Rebase History</p>

            <Divider className="my-4" />

            {results ? (
              <RebaseEarningsTable data={results} price={stats.price} />
            ) : (
              <div className="flex items-center justify-center">
                <InfoCircle size={20} className="mr-2" /> Click the Calculate
                button to see the results
              </div>
            )}
          </DarkBox>
        </Container>
      </Layout>
    </div>
  );
}

export default Index;

export const getStaticProps = async () => {
  const titano = await getStatsList('Titano', false);

  return {
    props: {
      titano,
    },
    revalidate: 10,
  };
};
