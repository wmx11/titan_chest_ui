import Script from 'next/script';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Loader } from '@mantine/core';
import useSWR from 'swr';
import Line from '../components/Charts/Line';
import Container from '../components/Container';
import Layout from '../components/Layouts/titanchest/Layout';
import MarketDataGroup from '../components/Stats/MarketDataGroup';
import useChartData from '../hooks/charts/useChartData';
import { PresentationChartLineIcon } from '@heroicons/react/solid';
import { getCmsContent, getStatsList } from '../utils/getters';
import CmsBlock from '../components/CmsBlock';
import DarkBox from '../components/DarkBox';
import CmsRoadmap from '../components/CmsRoadmap';
import { format } from 'date-fns';
import DarkNotification from '../components/DarkNotification';

export default function Home({
  titano,
  titanoLastDay,
  cmsContent,
  cmsRoadmap,
  cmsTodayAnnouncements,
}) {
  const [titanoData, setTitanoData] = useState('');
  const chartContainerRef = useRef();
  const viewport = useRef();

  useSWR('titano', async () => {
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
  });

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
      <Layout viewportRef={viewport}>
        <Container>
          <DarkNotification
            data={cmsTodayAnnouncements}
            text="We have some new announcements!"
            href="/announcements"
            useStorage={true}
            instantOpen={true}
          />
          <DarkBox>
            {titanoData ? (
              <MarketDataGroup
                data={titanoData}
                lastDayData={lastDayData}
                onChartSelect={execute(chartContainerRef, viewport)}
              />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <Loader color="green" />
              </div>
            )}
          </DarkBox>
        </Container>

        {chartData ? (
          <Container className="w-full md:w-1/2" ref={chartContainerRef}>
            <DarkBox>
              <Line
                data={{ data: chartData, labels }}
                type={type}
                chartLabel={chartName}
              />
            </DarkBox>
          </Container>
        ) : (
          <Container>
            <DarkBox>
              <div
                className="h-full text-center items-center text-slate-200"
                ref={chartContainerRef}
              >
                Click the
                <PresentationChartLineIcon className="h-5 w-5 inline mx-2" />
                icon in the stats tab to see the charts.
              </div>
            </DarkBox>
          </Container>
        )}

        <Container className="flex flex-col flex-wrap justify-between md:flex-row gap-x-8">
          {cmsRoadmap && (
            <DarkBox className="flex-1 mb-8 min-w-[300px]">
              <p className="mb-4 text-white text-2xl">Roadmap</p>
              <CmsBlock
                dataSet={cmsContent}
                block="home_roadmap"
                provideStyles={true}
              />
              <CmsRoadmap dataSet={cmsRoadmap} block="home_roadmap" />
            </DarkBox>
          )}

          <div className="flex-1 mb-8">
            {/* Homepage CMS Content */}
            {cmsContent && (
              <DarkBox className="mb-8">
                <CmsBlock
                  dataSet={cmsContent}
                  block="home_disclaimer"
                  provideStyles={true}
                />
              </DarkBox>
            )}

            {/* Crypto Heat Map */}
            <DarkBox>
              <CmsBlock
                dataSet={cmsContent}
                block="home_heatmap"
                provideStyles={true}
              />
              <coingecko-coin-heatmap-widget
                height="400"
                width="100%"
                locale="en"
              ></coingecko-coin-heatmap-widget>
              <Script src="https://widgets.coingecko.com/coingecko-coin-heatmap-widget.js" />
            </DarkBox>
          </div>
        </Container>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const titano = await getStatsList('Titano?compute=total_supply', true);
  const titanoLastDay = await getStatsList(
    'Titano?last_day=true&compute=total_supply',
    true
  );
  const cmsContent = await getCmsContent(
    'content-blocks?filters[block_name][$eq]=home_disclaimer&filters[block_name][$eq]=home_roadmap&filters[block_name][$eq]=home_heatmap&filters[enabled][$eq]=true',
    true
  );
  const cmsRoadmap = await getCmsContent(
    'roadmaps?filters[block_name][$eq]=home_roadmap&filters[enabled][$eq]=true',
    true
  );
  const cmsTodayAnnouncements = await getCmsContent(
    `announcements?filters[publishedAt][$gte]=${format(
      new Date(),
      'yyyy-MM-dd'
    )}&filters[enabled][$eq]=true`,
    true
  );

  return {
    props: {
      titano,
      titanoLastDay,
      cmsContent,
      cmsRoadmap,
      cmsTodayAnnouncements,
    },
  };
};
