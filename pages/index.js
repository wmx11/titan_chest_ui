import { Loader } from '@mantine/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Line from '../components/Charts/Line';
import Container from '../components/Container';
import Layout from '../components/Layouts/titanchest/Layout';
import MarketDataGroup from '../components/Stats/MarketDataGroup';
import useChartData from '../hooks/charts/useChartData';
import { getStatsList } from '../utils/getters';

export default function Home({ titano, titanoLastDay, underStatsBlock }) {
  const { data, error } = useSWR(
    'titano',
    async () => {
      const data = await getStatsList('Titano', false);
      return data[0];
    },
    { refreshInterval: 1000 * 60 }
  );

  const [lastDayData, setLastDayData] = useState('');

  const [contentBlock, setContentBlock] = useState('');

  const { chartData, labels, type, chartName, execute } = useChartData();

  useEffect(() => {
    if (!titano) {
      return;
    }

    if (titanoLastDay) {
      setLastDayData(titanoLastDay[0]);
    }

    if (underStatsBlock) {
      setContentBlock(underStatsBlock);
    }
  }, [titano, titanoLastDay, underStatsBlock]);

  return (
    <div>
      <Head>
        <title>Titan Chest</title>
      </Head>
      <Layout>
        <Container>
          {data ? (
            <MarketDataGroup
              data={data}
              lastDayData={lastDayData}
              onChartSelect={execute}
            />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Loader color="green" />
            </div>
          )}

          {contentBlock && (
            <div
              className="text-white text-xs break-all"
              dangerouslySetInnerHTML={{ __html: contentBlock.content }}
            ></div>
          )}
        </Container>

        {chartData && (
          <Container className="w-full md:w-1/2">
            <Line
              data={{ data: chartData, labels }}
              type={type}
              chartLabel={chartName}
            />
          </Container>
        )}
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const titano = await getStatsList('Titano', true);
  const titanoLastDay = await getStatsList('Titano?last_day=true', true);

  return {
    props: {
      titano,
      titanoLastDay,
    },
  };
};
