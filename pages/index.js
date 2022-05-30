import { Loader } from '@mantine/core';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Line from '../components/Charts/Line';
import Container from '../components/Container';
import Layout from '../components/Layouts/titanchest/Layout';
import MarketDataGroup from '../components/Stats/MarketDataGroup';
import useChartData from '../hooks/charts/useChartData';
import { PresentationChartLineIcon } from '@heroicons/react/solid';
import { getCmsContent, getStatsList } from '../utils/getters';
import CmsBlock from '../components/CmsBlock';

export default function Home({ titano, titanoLastDay, cmsContent }) {
  const [titanoData, setTitanoData] = useState('');

  useSWR(
    'titano',
    async () => {
      const data = await getStatsList('Titano?compute=total_supply', false);
      const {
        data: { data: fearData },
      } = await axios('https://api.alternative.me/fng/');

      const response = {
        ...data[0],
        fear_index: fearData[0].value_classification,
        fear_value: fearData[0].value,
      };

      setTitanoData(response);

      return response;
    },
    { refreshInterval: 1000 * 60 }
  );

  const [lastDayData, setLastDayData] = useState('');
  const { chartData, labels, type, chartName, execute } = useChartData();

  useEffect(() => {
    if (titano) {
      setTitanoData(titano[0]);
    }

    if (titanoLastDay) {
      setLastDayData(titanoLastDay[0]);
    }
  }, [titano, titanoLastDay]);

  return (
    <div>
      <Head>
        <title>Titan Chest</title>
      </Head>
      <Layout>
        <Container>
          {titanoData ? (
            <MarketDataGroup
              data={titanoData}
              lastDayData={lastDayData}
              onChartSelect={execute}
            />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Loader color="green" />
            </div>
          )}
        </Container>

        {chartData ? (
          <Container className="w-full md:w-1/2 bg-slate-900/30 rounded-md shadow-lg">
            <Line
              data={{ data: chartData, labels }}
              type={type}
              chartLabel={chartName}
            />
          </Container>
        ) : (
          <Container className="flex justify-center items-center bg-slate-900/30 rounded-md shadow-lg">
            <div className="h-full items-center text-slate-200">
              Click the
              <PresentationChartLineIcon className="h-5 w-5 inline mx-2" />
              icon in the stats tab to see the charts.
            </div>
          </Container>
        )}

        <Container className="mt-12">
          <CmsBlock
            dataSet={cmsContent}
            block="home_disclaimer"
            provideStyles={true}
          />
        </Container>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const titano = await getStatsList('Titano?compute=total_supply', true);
  const titanoLastDay = await getStatsList('Titano?last_day=true&compute=total_supply', true);
  const cmsContent = await getCmsContent(
    'content-blocks?filters[block_name][$eq]=home_disclaimer&filters[enabled][$eq]=true',
    true
  );

  return {
    props: {
      titano,
      titanoLastDay,
      cmsContent,
    },
  };
};
