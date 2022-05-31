import { useMediaQuery } from '@mantine/hooks';
import Head from 'next/head';
import React from 'react';
import CmsBlock from '../../components/CmsBlock';
import Container from '../../components/Container';
import Heading from '../../components/Heading';
import Layout from '../../components/Layouts/titanchest/Layout';
import { getCmsContent } from '../../utils/getters';

function Index({ cmsContent }) {
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
  return (
    <div>
      <Head>
        <title>Titano Dexscreener Chart</title>
        <meta
          name="description"
          content="Titano Dexscreener on Titan Chest"
        />

        <meta
          property="og:description"
          content="Titano Dexscreener on Titan Chest"
        />
      </Head>
      <Layout>
        <Container>
          <Heading className="text-white">Titano Trading Chart</Heading>
          <CmsBlock dataSet={cmsContent} block="trading-chart_subheader" />
          <div
            className="mt-12"
            id="dexscreener-embed"
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: isSmallScreen ? '125%' : '100vh',
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                border: '0',
              }}
              src="https://dexscreener.com/bsc/0x072856bC98e65ECaf8cA6412567e894617cC62c2?embed=1&theme=dark"
            ></iframe>
          </div>
        </Container>
      </Layout>
    </div>
  );
}

export default Index;

export const getServerSideProps = async () => {
  const cmsContent = await getCmsContent(
    'content-blocks?filters[block_name][$eq]=trading-chart_subheader&filters[enabled][$eq]=true',
    true
  );
  return {
    props: {
      cmsContent,
    },
  };
};
