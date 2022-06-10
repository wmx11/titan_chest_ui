import { Divider } from '@mantine/core';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import CmsBlock from '../../components/CmsBlock';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import Heading from '../../components/Heading';
import NumberInput from '../../components/Layouts/titanchest/Inputs/NumberInput';
import SelectInput from '../../components/Layouts/titanchest/Inputs/Select';
import {
  formatCurrency,
  parseDollar,
} from '../../components/Layouts/titanchest/Inputs/utils';
import Layout from '../../components/Layouts/titanchest/Layout';
import NeonCardWrapper from '../../components/NeonCardWrapper';
import NeonText from '../../components/NeonText';
import SmallText from '../../components/SmallText';
import { getCmsContent, getStatsList } from '../../utils/getters';
import toCurrency from '../../utils/toCurrency';
import toPercentage from '../../utils/toPercentage';
import titanoConfig from '../../config/titano';
import { InfoCircle } from 'tabler-icons-react';

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
        <meta
          name="description"
          content="Titano price impact calculator. Find out how your or someone's transaction would affect the overall price of Titano!"
        />

        <meta
          property="og:description"
          content="Titano price impact calculator. Find out how your or someone's transaction would affect the overall price of Titano!"
        />
      </Head>
      <Layout>
        <Container>
          <Heading className="text-white">Price Impact Calculator</Heading>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-x-4 gap-y-4">
            <div className="flex-1 md:min-w-[320px]">
              <DarkBox className="text-white">
                <div className="mb-4">
                  <SelectInput
                    label="I want to"
                    value={type}
                    onChange={setType}
                    data={[
                      { value: 'sell', label: 'Sell' },
                      { value: 'buy', label: 'Buy' },
                    ]}
                  />
                </div>
                <div className="mb-4 flex gap-x-4">
                  <div className="flex-1">
                    <NumberInput
                      value={amount}
                      label="Amount"
                      onChange={setAmount}
                      parser={parseDollar}
                      formatter={(value) => formatCurrency(value, currency)}
                    />
                  </div>
                  <div className="flex-1">
                    <SelectInput
                      label="Using Currency"
                      value={currency}
                      onChange={setCurrency}
                      data={[
                        { value: 'titano', label: 'Titano' },
                        { value: 'usd', label: 'USD' },
                      ]}
                    />
                  </div>
                </div>
              </DarkBox>
            </div>
            <div className="flex-1 md:min-w-[320px]">
              <div>
                {results ? (
                  <DarkBox>
                    <p className="text-white text-2xl font-bold mb-4">
                      Results
                    </p>
                    <DarkBox className="text-white space-y-4">
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
                          ? (
                              results.received *
                              (1 - titanoConfig.sellTax)
                            ).toLocaleString()
                          : (
                              results.received *
                              (1 - titanoConfig.buyTax)
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
                                (1 - titanoConfig.sellTax)
                            )
                          : toCurrency(
                              results.received *
                                results.price *
                                (1 - titanoConfig.buyTax)
                            )}
                      </p>
                    </DarkBox>
                  </DarkBox>
                ) : (
                  <DarkBox className="flex items-center justify-center text-white">
                    <InfoCircle size={20} className="mr-2" /> Change the
                    calculator values to see the results
                  </DarkBox>
                )}
              </div>
            </div>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col md:flex-row flex-wrap gap-x-4 gap-y-4">
            <div className="flex-1 min-w-[315px]">
              {cmsContent && (
                <DarkBox>
                  <CmsBlock
                    dataSet={cmsContent}
                    block="price_impact_disclaimer"
                    provideStyles={true}
                  />
                </DarkBox>
              )}
            </div>
            <div className="flex-1">
              <DarkBox>
                <Heading className="text-white">Current Market Data</Heading>
                <div className="flex flex-wrap items-center">
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

export const getStaticProps = async () => {
  const titano = await getStatsList('Titano', false);
  const cmsContent = await getCmsContent(
    'content-blocks?filters[block_name][$eq]=price_impact_disclaimer&filters[enabled][$eq]=true',
    false
  );

  return {
    props: {
      titano,
      cmsContent,
    },
    revalidate: 10,
  };
};
