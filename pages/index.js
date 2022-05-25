import Head from 'next/head';
import { useEffect, useState } from 'react';
import Line from '../components/Charts/Line';
import Container from '../components/Container';
import Layout from '../components/Layouts/titanchest/Layout';
import MarketDataGroup from '../components/Stats/MarketDataGroup';
import useChartData from '../hooks/charts/useChartData';
import { getCmsContent, getStatsList } from '../utils/getters';

export default function Home({ titano, titanoLastDay, underStatsBlock }) {
  const { chartData, labels, type, chartName, execute } =
    useChartData();
  const [data, setData] = useState('');
  const [lastDayData, setLastDayData] = useState('');
  const [contentBlock, setContentBlock] = useState('');

  useEffect(() => {
    if (!titano) {
      return;
    }

    setData(titano[0]);

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
          <MarketDataGroup
            data={data}
            lastDayData={lastDayData}
            onChartSelect={execute}
          />

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
  const underStatsBlock = await getCmsContent('content-blocks/1', true);

  return {
    props: {
      titano,
      titanoLastDay,
      underStatsBlock,
    },
  };
};
