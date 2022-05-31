import { Divider, NumberInput, Select } from '@mantine/core';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import CmsBlock from '../../components/CmsBlock';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import NeonCardWrapper from '../../components/NeonCardWrapper';
import NeonText from '../../components/NeonText';
import SmallText from '../../components/SmallText';
import { getCmsContent, getStatsList } from '../../utils/getters';
import toCurrency from '../../utils/toCurrency';
import toPercentage from '../../utils/toPercentage';

function Index({ titano, cmsContent }) {
  const [currentData, setCurrentData] = useState();
  const [results, setResults] = useState();
  const [constantProduct, setConstantProduct] = useState(0);

  const [type, setType] = useState('sell');
  const [currency, setCurrency] = useState('titano');
  const [amount, setAmount] = useState(1);

  const getAmount = useCallback(() => {
    if (currency === 'usd') {
      return amount / currentData.price;
    }

    return amount;
  }, [amount, currency, currentData]);

  // Titano in, BNB out
  const handleSell = useCallback(() => {
    if (!currentData) {
      return;
    }

    const titano_amount = currentData.titano_amount + getAmount();
    const bnb_amount = constantProduct / titano_amount;
    const titanoBnb = bnb_amount / titano_amount;
    const liquidity = bnb_amount * currentData.pair_price;
    const price = titanoBnb * currentData.pair_price;

    setResults({
      impact: ((price * 100) / currentData.price - 100 || 0).toFixed(3),
      price: price || 0,
      liquidity: liquidity || 0,
      bnb_amount: bnb_amount || 0,
      titano_amount: titano_amount || 0,
      received: currentData.bnb_amount - bnb_amount || 0,
    });
  }, [constantProduct, currentData, getAmount]);

  // BNB in, Titano out
  const handleBuy = useCallback(() => {
    if (!currentData) {
      return;
    }

    const bnb_amount =
      currentData.bnb_amount +
      getAmount() * (currentData.bnb_amount / currentData.titano_amount);

    const titano_amount = constantProduct / bnb_amount;

    const titanoBnb = bnb_amount / titano_amount;
    const liquidity = bnb_amount * currentData.pair_price;
    const price = titanoBnb * currentData.pair_price;

    setResults({
      impact: ((price * 100) / currentData.price - 100 || 0).toFixed(3),
      price: price || 0,
      liquidity: liquidity || 0,
      bnb_amount: bnb_amount || 0,
      titano_amount: titano_amount || 0,
      received: currentData.titano_amount - titano_amount || 0,
    });
  }, [constantProduct, currentData, getAmount]);

  const calculate = useCallback(() => {
    switch (type) {
      case 'buy':
        handleBuy();
        break;
      case 'sell':
        handleSell();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, currency, amount]);

  useEffect(() => {
    if (titano) {
      const { price, pair_price, liquidity } = titano[0];

      setCurrentData({
        price,
        pair_price,
        liquidity,
        bnb_amount: liquidity / pair_price,
        titano_amount: liquidity / price,
      });

      setConstantProduct((liquidity / pair_price) * (liquidity / price));

      calculate();
    }
  }, [titano, calculate]);

  return (
    <div>
      <Head>
        <title>Titan Chest Price Impact Calculator</title>
      </Head>
      <Layout>
        <Container>
          <Heading className="text-white">Price Impact Calculator</Heading>

          <div className="flex flex-col md:flex-row md:flex-wrap">
            <div className="flex-1 md:mr-4 md:min-w-[320px] md:mb-8">
              <DarkBox className="text-white">
                <div className="mb-4">
                  <Select
                    classNames={{
                      input:
                        'p-5 rounded-md bg-slate-800/90 text-white border border-transparent focus:border-titano-green',
                      dropdown: 'bg-slate-800/90 backdrop-blur-sm border-none',
                      item: 'text-white',
                      hovered: 'bg-slate-700/90',
                      selected: 'bg-slate-600/90',
                    }}
                    label="I want to"
                    value={type}
                    onChange={setType}
                    variant="unstyled"
                    data={[
                      { value: 'sell', label: 'Sell' },
                      { value: 'buy', label: 'Buy' },
                    ]}
                    styles={{
                      label: { color: '#fff' },
                    }}
                  />
                </div>
                <div className="mb-4">
                  <NumberInput
                    value={amount}
                    classNames={{
                      input:
                        'p-5 rounded-md bg-slate-800/90 text-white border border-transparent focus:border-titano-green',
                      label: 'text-white',
                    }}
                    variant="unstyled"
                    label="Amount"
                    onChange={setAmount}
                    hideControls
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    formatter={(value) =>
                      !Number.isNaN(parseFloat(value))
                        ? `${currency === 'usd' ? '$ ' : ''}${value}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ','
                          )
                        : `${currency === 'usd' ? '$ ' : ''}`
                    }
                  />
                </div>
                <div>
                  <Select
                    value={currency}
                    onChange={setCurrency}
                    label="Using Currency"
                    classNames={{
                      input:
                        'p-5 rounded-md bg-slate-800/90 text-white border border-transparent focus:border-titano-green',
                      dropdown: 'bg-slate-800/90 backdrop-blur-sm border-none',
                      item: 'text-white',
                      hovered: 'bg-slate-700/90',
                      selected: 'bg-slate-600/90',
                      label: 'text-white',
                    }}
                    data={[
                      { value: 'titano', label: 'Titano' },
                      { value: 'usd', label: 'USD' },
                    ]}
                  />
                </div>
              </DarkBox>

              <div className="mt-8">
                {results && (
                  <>
                    <p className="text-white text-2xl mb-4">Results</p>
                    <DarkBox className="text-white space-y-4">
                      <p>
                        <em>Impact results</em>
                      </p>

                      <p>
                        <strong>Price Impact:</strong> {results.impact}%
                      </p>
                      <p>
                        <strong>Price After Transaction:</strong>{' '}
                        {toCurrency(results.price)} (
                        {(
                          toPercentage(results.price, currentData.price) - 100
                        ).toFixed(3)}
                        %)
                      </p>

                      <Divider />

                      <p>
                        <em>Liquidity Pool after the transaction</em>
                      </p>

                      <p>
                        <strong>Liquidity:</strong>{' '}
                        {toCurrency(results.liquidity)} (
                        {(
                          toPercentage(
                            results.liquidity,
                            currentData.liquidity
                          ) - 100
                        ).toFixed(3)}
                        %)
                      </p>
                      <p>
                        <strong>WBNB Amount:</strong>{' '}
                        {results.bnb_amount.toLocaleString()} (
                        {(
                          toPercentage(
                            results.bnb_amount,
                            currentData.bnb_amount
                          ) - 100
                        ).toFixed(3)}
                        %)
                      </p>
                      <p>
                        <strong>Titano Amount:</strong>{' '}
                        {results.titano_amount.toLocaleString()} (
                        {(
                          toPercentage(
                            results.titano_amount,
                            currentData.titano_amount
                          ) - 100
                        ).toFixed(3)}
                        %)
                      </p>

                      <Divider />

                      <p>
                        <em>Transaction results. You would receive:</em>
                      </p>

                      <p>
                        <strong>
                          {type === 'sell' ? 'BNB' : 'Titano'} Received:
                        </strong>{' '}
                        {results.received.toLocaleString()}{' '}
                        {type === 'sell' ? 'BNB' : 'Titano'}
                      </p>
                      <p>
                        <strong>
                          After {type === 'sell' ? 'Sell (18%)' : 'Buy (13%)'}{' '}
                          Tax:
                        </strong>{' '}
                        {type === 'sell'
                          ? (results.received * (1 - 0.18)).toLocaleString()
                          : (
                              results.received *
                              (1 - 0.13)
                            ).toLocaleString()}{' '}
                        {type === 'sell' ? 'BNB' : 'Titano'}
                      </p>

                      <Divider />

                      <p>
                        <strong>USD Value (Before Tax):</strong>{' '}
                        {type === 'sell'
                          ? toCurrency(
                              results.received * currentData.pair_price
                            )
                          : toCurrency(results.received * results.price)}
                      </p>
                      <p>
                        <strong>USD Value (After Tax):</strong>{' '}
                        {type === 'sell'
                          ? toCurrency(
                              results.received *
                                currentData.pair_price *
                                (1 - 0.18)
                            )
                          : toCurrency(
                              results.received * results.price * (1 - 0.13)
                            )}
                      </p>
                    </DarkBox>
                  </>
                )}
                {cmsContent && (
                  <DarkBox className="mt-8">
                    <CmsBlock
                      dataSet={cmsContent}
                      block="price_impact_disclaimer"
                      provideStyles={true}
                    />
                  </DarkBox>
                )}
              </div>
            </div>

            <div className="flex-1 mt-8 md:mt-0">
              <Heading className="text-white">Current Market Data</Heading>
              <DarkBox>
                <div className="flex flex-wrap">
                  {currentData && (
                    <>
                      <NeonCardWrapper>
                        <NeonText>{toCurrency(currentData.price)}</NeonText>
                        <SmallText>Current Price</SmallText>
                      </NeonCardWrapper>
                      <NeonCardWrapper>
                        <NeonText>
                          {toCurrency(currentData.pair_price)}
                        </NeonText>
                        <SmallText>BNB Price</SmallText>
                      </NeonCardWrapper>
                      <NeonCardWrapper>
                        <NeonText>{toCurrency(currentData.liquidity)}</NeonText>
                        <SmallText>Liquidity</SmallText>
                      </NeonCardWrapper>
                      <NeonCardWrapper>
                        <NeonText>
                          {currentData.bnb_amount.toLocaleString()}
                        </NeonText>
                        <SmallText>WBNB Amount (LP)</SmallText>
                      </NeonCardWrapper>
                      <NeonCardWrapper>
                        <NeonText>
                          {currentData.titano_amount.toLocaleString()}
                        </NeonText>
                        <SmallText>TITANO Amount (LP)</SmallText>
                      </NeonCardWrapper>
                    </>
                  )}
                </div>
              </DarkBox>
            </div>
          </div>
        </Container>
      </Layout>
    </div>
  );
}

export default Index;

export const getServerSideProps = async () => {
  const titano = await getStatsList('Titano', true);
  const cmsContent = await getCmsContent(
    'content-blocks?filters[block_name][$eq]=price_impact_disclaimer&filters[enabled][$eq]=true',
    true
  );

  return {
    props: {
      titano,
      cmsContent,
    },
  };
};
