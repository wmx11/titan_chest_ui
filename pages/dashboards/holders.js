import { AccordionItem, Divider, Pagination } from '@mantine/core';
import { format } from 'date-fns';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { TitanoGreenButton, TitanoPinkButton } from '../../components/Buttons';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import DarkTable from '../../components/DarkTable';
import Heading from '../../components/Heading';
import Accordion from '../../components/Layouts/titanchest/Accordion';
import NumberInput from '../../components/Layouts/titanchest/Inputs/NumberInput';
import Select from '../../components/Layouts/titanchest/Inputs/Select';
import TextInput from '../../components/Layouts/titanchest/Inputs/TextInput';
import Layout from '../../components/Layouts/titanchest/Layout';
import NeonText from '../../components/NeonText';
import titanoConfig from '../../config/titano';
import { getHolders, getStatsList } from '../../utils/getters';
import toCurrency from '../../utils/toCurrency';

function Holders({ titano, holders, distribution }) {
  const [titanoData, setTitanoData] = useState();
  const [holdersData, setHoldersData] = useState();
  const [activePage, setPage] = useState(1);
  const [queryString, setQueryString] = useState('');

  const [order, setOrder] = useState('order=desc');
  const [dust, setDust] = useState('gte=1');
  const [filterBy, setFilterBy] = useState('');
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState('titano');

  const [address, setAddress] = useState('');
  const [addressResults, setAddressResults] = useState();

  const { data: holdersSwr } = useSWR(
    `/holders?page=${activePage}${queryString}`,
    async () => {
      const data = await getHolders(`?page=${activePage}${queryString}`, false);
      setHoldersData(data);
      return data;
    },
    {
      fallbackData: holders,
    }
  );

  const handleFilters = () => {
    const getFilterByAmount = () => {
      const amountByCurrency =
        currency === 'usd'
          ? Math.trunc(amount / titanoData.price)
          : Math.trunc(amount);

      if (amountByCurrency > 0) {
        return `${filterBy}=${amountByCurrency}`;
      }

      return '';
    };

    const filterByAmount = getFilterByAmount();

    const query = [order, filterByAmount ? filterByAmount : dust]
      .map((item) => (item !== '' ? item : ''))
      .join('&');

    setQueryString(`&${query}`);
  };

  const handleResetFilters = () => {
    setOrder('order=desc');
    setDust('gte=1');
    setFilterBy('');
    setAmount();
    setCurrency('titano');
    setQueryString('');
  };

  const handleWalletSearch = async () => {
    const wallet = await getHolders(`?get-position&address=${address}`, false);
    setAddressResults(wallet);
  };

  const getWalletTier = (amount) => {
    const tiers = titanoConfig.walletTiers.filter(
      ({ value }) => amount <= value
    );

    if (tiers.length) {
      return tiers[0].name;
    }

    return 'Probably plankton? 🦠';
  };

  useEffect(() => {
    if (titano) {
      setTitanoData(titano[0]);
    }

    if (holdersSwr) {
      setHoldersData(holdersSwr);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Titano holders dashboard</title>
        <meta
          name="description"
          content="Titano holders dashboard. View all wallest holding Titano tokens. Filter and sort wallets by dollar or token value. Find wallet information by their address."
        />

        <meta
          property="og:description"
          content="Titano holders dashboard. View all wallest holding Titano tokens. Filter and sort wallets by dollar or token value. Find wallet information by their address."
        />
      </Head>
      <Layout>
        <Container>
          <Heading className="text-white">Holders Dashboard</Heading>

          {titanoData && (
            <div className="flex flex-col md:flex-row gap-4 mb-8 flex-wrap">
              <div className="md:w-[50%]">
                <DarkBox
                  withBorder
                  withHover
                  className="text-center md:min-w-[300px] flex items-center justify-center flex-1 mb-4"
                >
                  <div>
                    <NeonText className="!text-3xl font-bold mb-2">
                      {titanoData.holders.toLocaleString()}
                    </NeonText>
                    <NeonText className="!text-sm">
                      Holding more than 1 Titano
                    </NeonText>
                  </div>
                </DarkBox>

                <DarkBox
                  withBorder
                  withHover
                  className="text-center md:min-w-[300px] flex items-center justify-center flex-1"
                >
                  <div className="w-full flex-1">
                    <NeonText className="!text-3xl font-bold mb-2">
                      {titanoData.average_holdings.toLocaleString()}
                    </NeonText>
                    <NeonText className="!text-sm">
                      <p>Average Holdings</p>
                      <p>(Titano tokens)</p>
                    </NeonText>
                  </div>
                </DarkBox>
              </div>

              <DarkBox
                withBorder
                withHover
                className="text-white flex-1 w-full md:min-w-[300px] md:max-w-[50%]"
              >
                <p className="text-white font-bold text-xl break-words">
                  Wallets distribution by token amount
                </p>
                <Divider className="my-4" />
                {distribution &&
                  distribution.map(({ name, value }, index) => (
                    <div
                      key={`distribution_${index}`}
                      className="flex flex-col justify-between mb-4 md:flex-row md:gap-4 md:mb-2"
                    >
                      <p className="flex-1 font-bold">{name}</p>
                      <p className="flex-1">
                        {(value > 0 ? value : 0).toLocaleString()} wallets
                      </p>
                    </div>
                  ))}
              </DarkBox>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-8 flex-wrap">
            <DarkBox className="flex-1 text-white w-full md:min-w-[320px]">
              <p className="text-white font-bold text-xl">
                Find wallet by address
              </p>
              <Divider className="my-4" />
              <TextInput
                label="Wallet address"
                value={address}
                error={
                  address &&
                  !address.startsWith('0x') &&
                  'Wrong Format. Must be 0x...'
                }
                onChange={(event) => setAddress(event.currentTarget.value)}
              />
              <TitanoGreenButton
                disabled={address === '' || !address.startsWith('0x')}
                className="font-bold w-full mt-4"
                onClick={handleWalletSearch}
              >
                Search
              </TitanoGreenButton>

              {addressResults && (
                <DarkBox className="mt-4">
                  <p className="font-bold text-xl">Results</p>
                  <Divider className="my-4" />
                  <div className="flex flex-col gap-y-4">
                    <p>
                      <strong>Rank:</strong> {addressResults.address.position}
                    </p>
                    <p>
                      <strong>Tier:</strong>{' '}
                      {getWalletTier(addressResults.address.wallet.value)}
                    </p>
                    <p className="break-all">
                      <strong>Address:</strong>{' '}
                      {addressResults.address.wallet.address}
                    </p>
                    <p>
                      <strong>Quantity: </strong>
                      {addressResults.address.wallet.value.toLocaleString()}
                    </p>
                    <p>
                      <strong>Value: </strong>
                      {toCurrency(
                        addressResults.address.wallet.value * titanoData.price
                      )}
                    </p>
                    <p>
                      <strong>Last updated: </strong>
                      {format(
                        new Date(addressResults.address.wallet.updated_at),
                        'yyyy-MM-dd HH:mm'
                      )}
                    </p>
                  </div>
                </DarkBox>
              )}
            </DarkBox>
            <DarkBox className="flex-1 text-white w-full md:min-w-[320px]">
              <p className="font-bold text-xl">Holdings tier list</p>
              <Divider className="my-4" />
              {titanoConfig.walletTiers.map(({ name, value }, index) => (
                <div
                  className="flex flex-col justify-between mb-4 md:flex-row md:gap-4 md:mb-2"
                  key={`tier_list_${index}_name}`}
                >
                  <p className="flex-1 font-bold">{name}</p>
                  <p className="flex-1">
                    {(
                      titanoConfig.walletTiers[index - 1]?.value + 1 || 0
                    ).toLocaleString()}
                    {' - '}
                    {Math.floor(value).toLocaleString()}
                    {' Titano'}
                  </p>
                </div>
              ))}
            </DarkBox>
          </div>

          <div className="mb-8">
            <DarkBox>
              <p className="text-white font-bold text-xl">Holders list</p>
              <Divider className="my-4" />
              {holdersData && (
                <>
                  <p className="text-white">
                    Wallets:{' '}
                    <strong>{holdersData.data.count.toLocaleString()}</strong>
                  </p>
                  <Accordion>
                    <AccordionItem label="Filters">
                      <div className="flex flex-col items-stretch gap-4 flex-wrap md:flex-row md:items-end ">
                        <div>
                          <Select
                            label="Order by quantity"
                            value={order}
                            onChange={setOrder}
                            data={[
                              { value: 'order=desc', label: 'Descending' },
                              { value: 'order=asc', label: 'Ascending' },
                            ]}
                          />
                        </div>
                        <div>
                          <Select
                            label="Show dust wallets (below 1 token)"
                            value={dust}
                            onChange={setDust}
                            data={[
                              { value: 'gte=1', label: 'No' },
                              { value: 'lte=1', label: 'Yes' },
                            ]}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row flex-wrap gap-4">
                          <Select
                            label="Filter by amount"
                            placeholder="Select operator"
                            onChange={setFilterBy}
                            data={[
                              { value: 'lte', label: 'Less than' },
                              { value: 'gte', label: 'More than' },
                            ]}
                          />
                          <NumberInput
                            label="Amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={setAmount}
                          />
                          <Select
                            label="Currency"
                            value={currency}
                            onChange={setCurrency}
                            data={[
                              { value: 'titano', label: 'Titano' },
                              { value: 'usd', label: 'USD' },
                            ]}
                          />
                        </div>
                        <div className="flex gap-4">
                          <TitanoGreenButton
                            className="font-bold whitespace-nowrap"
                            onClick={handleFilters}
                          >
                            Filter
                          </TitanoGreenButton>
                          <TitanoPinkButton
                            className="font-bold"
                            onClick={handleResetFilters}
                          >
                            Reset Filters
                          </TitanoPinkButton>
                        </div>
                      </div>
                    </AccordionItem>
                  </Accordion>
                  <DarkTable
                    data={[
                      {
                        head: [
                          { width: 65, name: 'No.' },
                          { width: 330, name: 'Address' },
                          { width: 150, name: 'Quantity' },
                          { width: 150, name: 'Value' },
                          { width: 150, name: 'Last Updated' },
                        ],
                      },
                      {
                        rows: holdersData.data.holders.map(
                          ({ address, value, updated_at }, index) => ({
                            row: [
                              {
                                value: (
                                  holdersData.data.page *
                                    holdersData.data.perPage -
                                  holdersData.data.perPage -
                                  (index + 1) * -1
                                ).toLocaleString(),
                              },
                              {
                                value: (
                                  <a
                                    href={`https://bscscan.com/token/0x4e3cabd3ad77420ff9031d19899594041c420aee?a=${address}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline underline-offset-1"
                                  >
                                    {address}
                                  </a>
                                ),
                                truncate: true,
                              },
                              { value: value.toLocaleString() },
                              { value: toCurrency(titanoData.price * value) },
                              {
                                value: format(
                                  new Date(updated_at),
                                  'yyyy-MM-dd HH:mm'
                                ),
                              },
                            ],
                          })
                        ),
                      },
                    ]}
                  />

                  <div className="flex justify-end items-center mt-4">
                    <Pagination
                      total={holdersData.data.pageCount}
                      page={activePage}
                      onChange={setPage}
                      classNames={{
                        item: 'text-white',
                        dots: 'text-white',
                        active:
                          'text-titano-green border border-titano-green bg-titano-green/20',
                      }}
                    />
                  </div>
                </>
              )}
            </DarkBox>
          </div>
        </Container>
      </Layout>
    </div>
  );
}

export default Holders;

export const getServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const titano = await getStatsList('Titano', true);
  const holders = await getHolders('holders', true);

  // 1,000, 10,000, 50,000, 100,000, 500,000, 1,000,000, 5,000,000, 10,000,000 50,000,000 100,000,000

  const {
    data: { count: dust },
  } = await getHolders('holders?limit=1&lte=1', true);
  const {
    data: { count: thousand },
  } = await getHolders('holders?limit=1&gte=1000', true);
  const {
    data: { count: tenThousand },
  } = await getHolders('holders?limit=1&gte=10000', true);
  const {
    data: { count: fiftyThousand },
  } = await getHolders('holders?limit=1&gte=50000', true);
  const {
    data: { count: hundredThousand },
  } = await getHolders('holders?limit=1&gte=100000', true);
  const {
    data: { count: million },
  } = await getHolders('holders?limit=1&gte=1000000', true);
  const {
    data: { count: fiveMillion },
  } = await getHolders('holders?limit=1&gte=5000000', true);
  const {
    data: { count: tenMillion },
  } = await getHolders('holders?limit=1&gte=10000000', true);
  const {
    data: { count: fiftyMillion },
  } = await getHolders('holders?limit=1&gte=50000000', true);

  return {
    props: {
      titano,
      holders,
      distribution: [
        { name: 'Up to 1,000', value: thousand - dust },
        { name: '1,000 - 10,000', value: thousand - tenThousand },
        { name: '10,000 - 50,000', value: tenThousand - fiftyThousand },
        {
          name: '50,000 - 100,000',
          value: fiftyThousand - hundredThousand,
        },
        {
          name: '100,000 - 1,000,000',
          value: hundredThousand - million,
        },
        {
          name: '1,000,000 - 5,000,000',
          value: million - fiveMillion,
        },
        {
          name: '5,000,000 - 10,000,000',
          value: fiveMillion - tenMillion,
        },
        {
          name: '10,000,000 - 50,000,000',
          value: tenMillion - fiftyMillion,
        },
        {
          name: '50,000,000 and up',
          value: fiftyMillion,
        },
      ],
    },
  };
};
