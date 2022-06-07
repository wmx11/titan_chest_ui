import { Divider, Loader } from '@mantine/core';
import { format, isToday } from 'date-fns';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Flame } from 'tabler-icons-react';
import CmsBlock from '../../components/CmsBlock';
import Container from '../../components/Container';
import DarkBox from '../../components/DarkBox';
import DarkTable from '../../components/DarkTable';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import NeonText from '../../components/NeonText';
import {
  getCmsContent,
  getStatsList,
  getTransactions,
} from '../../utils/getters';
import toCurrency from '../../utils/toCurrency';

function BurnTracker({ titano, titanoLastDay, burns, cmsContent }) {
  const [titanoData, setTitanoData] = useState();
  const [titanoLastDayData, setTitanoLastDayData] = useState();
  const [burnsData, setBurnsData] = useState();
  const [burnStats, setBurnStats] = useState({
    burnedToday: 0,
    valueToday: 0,
    lastBurn: new Date(),
  });

  const generateBurnStats = (burns) => {
    if (!burns) {
      return;
    }

    return burns.reduce(
      (res, item, index) => {
        if (isToday(new Date(item.created_at))) {
          res.burnedToday = res.burnedToday + item.amount;
          res.valueToday = res.valueToday + item.amount * item.price;
        }

        if (index === 0) {
          res.lastBurn = format(new Date(item.created_at), 'yyyy-MM-dd HH:mm');
        }

        return res;
      },
      {
        burnedToday: 0,
        valueToday: 0,
        lastBurn: new Date(),
      }
    );
  };

  useSWR(
    'titano_burns',
    async () => {
      const data = await getStatsList('Titano', false);
      const burns = await getTransactions('', false);

      const response = {
        ...data[0],
      };

      setTitanoData(response);
      setBurnsData(burns);
      setBurnStats(generateBurnStats(burns));
      return response;
    },
    { refreshInterval: 1000 * 60 }
  );

  useEffect(() => {
    if (titano) {
      setTitanoData(titano[0]);
    }
    if (titanoLastDay) {
      setTitanoLastDayData(titanoLastDay[0]);
    }
    if (burns) {
      setBurnsData(burns);
      setBurnStats(generateBurnStats(burns));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>Titan Chest Burn Tracker</title>
        <meta
          name="description"
          content="Titano burn tracker dashboard. Track all latest titano token burns!"
        />

        <meta
          property="og:description"
          content="Titano burn tracker dashboard. Track all latest titano token burns!"
        />
      </Head>
      <Layout>
        {titanoData && burnStats ? (
          <Container>
            <Heading className="text-white flex items-center gap-x-2">
              <NeonText className="animate-pulse">
                <Flame size={25} />
              </NeonText>
              Burn Tracker
              <NeonText className="animate-pulse">
                <Flame size={25} />
              </NeonText>
            </Heading>
            <DarkBox className="flex gap-4 text-center mb-4 flex-wrap">
              <DarkBox className="w-full md:max-w-[320px]">
                <NeonText className="!text-3xl mb-4">
                  {titanoData.burned_tokens.toLocaleString()}
                </NeonText>
                <NeonText className="!text-sm">Total Burned</NeonText>
              </DarkBox>
              <DarkBox className="w-full md:max-w-[320px]">
                <NeonText className="!text-3xl mb-4">
                  {toCurrency(titanoData.burned_tokens * titanoData.price)}
                </NeonText>
                <NeonText className="!text-sm">Total Burned USD Value</NeonText>
              </DarkBox>
              <DarkBox className="w-full md:max-w-[320px]">
                <NeonText className="!text-3xl mb-4">
                  {burnStats.burnedToday.toLocaleString()}
                </NeonText>
                <NeonText className="!text-sm">Tokens Burned Today</NeonText>
              </DarkBox>
              <DarkBox className="w-full md:max-w-[320px]">
                <NeonText className="!text-3xl mb-4">
                  {toCurrency(burnStats.valueToday)}
                </NeonText>
                <NeonText className="!text-sm">
                  Tokens Burned Today USD Value
                </NeonText>
              </DarkBox>
              <DarkBox className="w-full md:max-w-[320px]">
                <NeonText className="!text-3xl mb-4">
                  {(
                    (titanoData.burned_tokens /
                      titanoLastDayData.burned_tokens) *
                      100 -
                    100
                  ).toFixed(2)}
                  %
                </NeonText>
                <NeonText className="!text-sm">24 Hour % Increase</NeonText>
              </DarkBox>
              <DarkBox className="w-full md:max-w-[320px]">
                <NeonText className="!text-3xl mb-4">
                  {(
                    (titanoData.burned_tokens /
                      (titanoData.marketcap / titanoData.price)) *
                    100
                  ).toFixed(2)}
                  %
                </NeonText>
                <NeonText className="!text-sm">
                  Total % Of Total Supply
                </NeonText>
              </DarkBox>
              <DarkBox className="w-full md:max-w-[320px]">
                <NeonText className="!text-3xl mb-4">
                  {burnStats.lastBurn}
                </NeonText>
                <NeonText className="!text-sm">Last Burn</NeonText>
              </DarkBox>
            </DarkBox>

            <DarkBox className="text-white">
              <CmsBlock
                dataSet={cmsContent}
                block="burn_tracker"
                provideStyles
              />
            </DarkBox>
          </Container>
        ) : (
          <Container>
            <DarkBox className="flex flex-col justify-center items-center p-10">
              <Loader color="green" />
            </DarkBox>
          </Container>
        )}
        <Container>
          <DarkBox>
            <p className="text-white">Burn History</p>
            <Divider className="my-4" />
            <p className="text-white mb-4">
              Showing the last <strong>100</strong> burns
            </p>
            {burnsData ? (
              <DarkTable
                data={[
                  {
                    head: [
                      { width: 25, name: 'No.' },
                      { width: 120, name: 'Txn Hash' },
                      { width: 120, name: 'From' },
                      { width: 120, name: 'Amount' },
                      { width: 100, name: 'USD Value' },
                      { width: 100, name: 'Titano Price' },
                      { width: 150, name: 'Date' },
                    ],
                  },
                  {
                    rows: burnsData.map((burnData, index) => ({
                      row: [
                        {
                          value: index + 1,
                          truncate: true,
                        },
                        {
                          value: (
                            <a
                              href={`https://bscscan.com/tx/${burnData.hash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="underline underline-offset-1"
                            >
                              {burnData.hash}
                            </a>
                          ),
                          truncate: true,
                        },
                        {
                          value: (
                            <a
                              href={`https://bscscan.com/address/${burnData.address}`}
                              target="_blank"
                              rel="noreferrer"
                              className="underline underline-offset-1"
                            >
                              {burnData.address}
                            </a>
                          ),
                          truncate: true,
                        },
                        {
                          value: burnData.amount.toLocaleString(),
                          truncate: true,
                        },
                        {
                          value: toCurrency(burnData.amount * burnData.price),
                          truncate: true,
                        },
                        {
                          value: toCurrency(burnData.price),
                          truncate: true,
                        },
                        {
                          value: format(
                            new Date(burnData.created_at),
                            'yyyy-MM-dd HH:mm:ss'
                          ),
                          truncate: true,
                        },
                      ],
                    })),
                  },
                ]}
              />
            ) : (
              <Container>
                <DarkBox className="flex flex-col justify-center items-center p-10">
                  <Loader color="green" />
                </DarkBox>
              </Container>
            )}
          </DarkBox>
        </Container>
      </Layout>
    </div>
  );
}

export default BurnTracker;

export const getServerSideProps = async () => {
  const titano = await getStatsList('Titano', true);
  const titanoLastDay = await getStatsList('Titano?last_day=true', true);
  const burns = await getTransactions('get/burns?limit=100', true);
  const cmsContent = await getCmsContent(
    'content-blocks?filters[block_name][$eq]=burn_tracker&filters[enabled][$eq]=true',
    true
  );

  return {
    props: {
      titano,
      titanoLastDay,
      burns,
      cmsContent,
    },
  };
};
